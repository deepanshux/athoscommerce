import { ChangeEvent, memo } from 'react';
import './SortOptions.css';

export interface SortOption {
  label: string;
  value: string;
}

export interface SortOptionsProps {
  onSelect: (value: string) => void;
  options: SortOption[];
  value: string;
}

const SortOptions = ({ onSelect, options, value }: SortOptionsProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className="sort-options">
      <label className="sort-options__label" htmlFor="product-sort">
        Sort by
      </label>
      <select
        className="sort-options__select"
        id="product-sort"
        onChange={handleChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SortOptions);