import { useEffect, useState } from 'react';
import { SelectedFilters } from '../components/ProductFilters/ProductFilters';

const PRICE_RANGE_SEPARATOR = 'to';

const setFilterParams = (params: URLSearchParams, filters: SelectedFilters) => {
  Object.entries(filters).forEach(([field, values]) => {
    if (field === 'price') {
      const [range] = values;
      const [low, high] = range?.split(PRICE_RANGE_SEPARATOR) ?? [];

      if (low && high) {
        params.set('filter.price.low', low);
        params.set('filter.price.high', high);
      }
      return;
    }

    if (values.length > 0) {
      params.set(`filter.${field}`, values.join(','));
    }
  });
};

const readUrlState = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get('q') ?? '',
    sort: params.get('sort') ?? '',
    filters: Array.from(params.entries()).reduce<SelectedFilters>((filters, [key, value]) => {
      if (key === 'filter.price.low') {
        filters.price = [value];
        return filters;
      }

      if (key === 'filter.price.high') {
        filters.price = [`${filters.price?.[0] ?? value}to${value}`];
        return filters;
      }

      if (!key.startsWith('filter.')) {
        return filters;
      }

      const field = key.slice('filter.'.length);
      filters[field] = value.split(',').filter(Boolean);
      return filters;
    }, {}),
  };
};

const updateUrl = (updates: {
  query?: string;
  sort?: string;
  filters?: SelectedFilters;
}) => {
  const params = new URLSearchParams(window.location.search);

  if (updates.query !== undefined) {
    if (updates.query) {
      params.set('q', updates.query);
    } else {
      params.delete('q');
    }
  }

  if (updates.sort !== undefined) {
    if (updates.sort) {
      params.set('sort', updates.sort);
    } else {
      params.delete('sort');
    }
  }

  if (updates.filters !== undefined) {
    Array.from(params.keys())
      .filter((key) => key.startsWith('filter.'))
      .forEach((key) => params.delete(key));

    setFilterParams(params, updates.filters);
  }

  if (updates.query !== undefined || updates.sort !== undefined || updates.filters !== undefined) {
    params.delete('page');
  }

  const queryString = params.toString();
  const nextUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.pushState({}, '', nextUrl);
};

const useSearchQuery = () => {
  const [urlState, setUrlState] = useState(readUrlState);
  const [inputValue, setInputValue] = useState(urlState.query);

  useEffect(() => {
    const handlePopState = () => {
      const nextUrlState = readUrlState();
      setUrlState(nextUrlState);
      setInputValue(nextUrlState.query);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const submitSearch = () => {
    const query = inputValue.trim();
    updateUrl({ query });
    setInputValue(query);
    setUrlState((currentState) => ({ ...currentState, query }));
  };

  const setSortQuery = (sort: string) => {
    updateUrl({ sort });
    setUrlState((currentState) => ({ ...currentState, sort }));
  };

  const setFilterQuery = (filters: SelectedFilters) => {
    updateUrl({ filters });
    setUrlState((currentState) => ({ ...currentState, filters }));
  };

  return {
    inputValue,
    searchQuery: urlState.query,
    sortQuery: urlState.sort,
    filterQuery: urlState.filters,
    setInputValue,
    setFilterQuery,
    setSortQuery,
    submitSearch,
  };
};

export default useSearchQuery;
