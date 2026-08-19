import React, { ChangeEvent, useRef } from 'react';
import './SearchBar.css';

export interface SearchBarProps {
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  placeholder?: string;
  value: string;
}

const SearchBar = ({
  onTextChange,
  onSubmit,
  onInputFocus,
  onInputBlur,
  placeholder = 'Search',
  value,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.blur();
    onSubmit();
  }; 

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="search-bar__label" htmlFor="site-search">
        Search
      </label>
      <input
        className="search-bar__input"
        id="site-search"
        name="search"
        onChange={handleTextChange}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        autoComplete="off"
        placeholder={placeholder}
        ref={inputRef}
        type="search"
        value={value}
      />
      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;