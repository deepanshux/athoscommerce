import { memo } from 'react';
import { IProductFacet } from '../../types/IProduct';
import { SelectedFilters } from '../ProductFilters/ProductFilters';
import './SelectedFilterPills.css';

export interface SelectedFilterPillsProps {
  facets: IProductFacet[];
  selectedFilters: SelectedFilters;
  onRemove: (field: string, value: string) => void;
  onClearAll: () => void;
}

const SelectedFilterPills = ({
  facets,
  selectedFilters,
  onRemove,
  onClearAll,
}: SelectedFilterPillsProps) => {
  const pills = facets.flatMap((facet) => (
    (selectedFilters[facet.field] ?? []).map((value) => ({
      field: facet.field,
      value,
      label: facet.options.find((option) => option.value === value)?.label ?? value,
    }))
  ));

  if (pills.length === 0) {
    return null;
  }

  return (
    <div className="selected-filter-pills" aria-label="Selected filters">
      {pills.map((pill) => (
        <button
          className="selected-filter-pills__pill"
          key={`${pill.field}-${pill.value}`}
          onClick={() => onRemove(pill.field, pill.value)}
          type="button"
        >
          {pill.label} <span aria-hidden="true">x</span>
        </button>
      ))}
      <button className="selected-filter-pills__clear" onClick={onClearAll} type="button">
        Clear all
      </button>
    </div>
  );
};

export default memo(SelectedFilterPills);
