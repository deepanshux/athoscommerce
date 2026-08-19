import { useState } from 'react';
import { IProductFacet } from '../../types/IProduct';
import './ProductFilters.css';

export type SelectedFilters = Record<string, string[]>;

export interface ProductFiltersProps {
  facets: IProductFacet[];
  selectedFilters: SelectedFilters;
  onChange: (field: string, value: string) => void;
  onClearAll: () => void;
}

const ProductFilters = ({
  facets,
  selectedFilters,
  onChange,
  onClearAll,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelectedFilters = Object.values(selectedFilters).some((values) => values.length > 0);

  if (facets.length === 0) {
    return null;
  }

  const filterContent = (
    <div className="product-filters__content">
      <div className="product-filters__header">
        <h2 className="product-filters__title">Filters</h2>
        {hasSelectedFilters && (
          <button className="product-filters__clear" onClick={onClearAll} type="button">
            Clear all
          </button>
        )}
      </div>
      {facets.map((facet) => (
        <fieldset className="product-filters__group" key={facet.field}>
          <legend>{facet.label}</legend>
          {facet.options.map((option) => {
            const selected = selectedFilters[facet.field]?.includes(option.value) ?? false;
            return (
              <label className="product-filters__option" key={option.value}>
                <input
                  checked={selected}
                  onChange={() => onChange(facet.field, option.value)}
                  type="checkbox"
                />
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="product-filters__count">({option.count})</span>
                )}
              </label>
            );
          })}
        </fieldset>
      ))}
    </div>
  );

  return (
    <section className="product-filters" aria-label="Product filters">
      <button
        aria-expanded={isOpen}
        className="product-filters__toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? 'Hide filters' : 'Show filters'}
      </button>
      <aside className={`product-filters__panel${isOpen ? ' product-filters__panel--open' : ''}`}>
        {filterContent}
      </aside>
    </section>
  );
};

export default ProductFilters;
