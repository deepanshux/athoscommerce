import { IProductFacet } from '../types/IProduct';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => (
  typeof value === 'object' && value !== null
);

const getOptionValue = (value: unknown, fallback: string) => {
  if (!isRecord(value)) {
    return fallback;
  }

  /**
   * Range facets have two numeric boundaries, but the filter state represents one selected
   * option as a single string. Keep this format consistent with the query builder, which later
  * splits it back into `filter.price.low` and `filter.price.high` for the API request.
   */
  if (value.type === 'range' && value.low !== undefined && value.high !== undefined) {
    return `${value.low}to${value.high}`;
  }

  /**
   * APIs can identify the same option with different field names depending on the response
   * shape. Prefer a stable explicit value, then fall back through common identifiers before
   * using the array index or object key supplied by the caller.
  */
  return String(value.value ?? value.id ?? value.key ?? value.name ?? value.label ?? fallback);
};

const getOptionLabel = (value: unknown, fallback: string) => {
  if (!isRecord(value)) {
    return fallback;
  }

  return String(value.label ?? value.name ?? value.display ?? value.value ?? fallback);
};

const getOptionCount = (value: unknown) => {
  if (!isRecord(value) || typeof value.count !== 'number') {
    return undefined;
  }

  return value.count;
};

const normalizeOptions = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((option, index) => {
      const fallback = String(index);
      return {
        value: getOptionValue(option, fallback),
        label: getOptionLabel(option, fallback),
        count: getOptionCount(option),
      };
    });
  }

  if (isRecord(value)) {
    return Object.entries(value).map(([key, option]) => ({
      value: getOptionValue(option, key),
      label: getOptionLabel(option, key),
      count: getOptionCount(option),
    }));
  }

  return [];
};

export const normalizeFacets = (
  features: UnknownRecord | undefined,
  facets?: unknown[],
): IProductFacet[] => {
  /**
   * Prefer the dedicated facets response when available. Some API versions put the same data
   * inside `features.facets`, while other responses expose the facet fields directly in
   * `features`, so the remaining branches handle those legacy shapes.
   */
  const sourceFacets = facets ?? (features && isRecord(features.facets) ? features.facets : undefined);

  if (Array.isArray(sourceFacets)) {
    /**
     * In the array format, each facet declares its own field and label. `flatMap` lets us omit
     * malformed entries and facets without options while returning the normalized array directly.
     */
    return sourceFacets.flatMap((rawFacet) => {
      if (!isRecord(rawFacet) || typeof rawFacet.field !== 'string') {
        return [];
      }

      const options = normalizeOptions(rawFacet.values ?? rawFacet.options ?? rawFacet.buckets);
      return options.length > 0
        ? [{ field: rawFacet.field, label: String(rawFacet.label ?? rawFacet.field), options }]
        : [];
    });
  }

  if (!features) {
    return [];
  }

  const source = isRecord(features.facets) ? features.facets : features;

  /**
   * In the keyed format, the object key is the facet field name and the value contains its
   * options. The same option extraction rules are reused so both API formats produce IProductFacet[].
   */
  return Object.entries(source).flatMap(([field, rawFacet]) => {
    if (!isRecord(rawFacet) && !Array.isArray(rawFacet)) {
      return [];
    }

    const optionsSource = isRecord(rawFacet)
      ? rawFacet.options ?? rawFacet.values ?? rawFacet.buckets ?? rawFacet
      : rawFacet;
    const options = normalizeOptions(optionsSource);

    if (options.length === 0) {
      return [];
    }

    return [{
      field,
      label: isRecord(rawFacet) && typeof rawFacet.label === 'string'
        ? rawFacet.label
        : field,
      options,
    }];
  });
};
