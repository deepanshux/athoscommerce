import { memo, useCallback, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { SearchHistory } from '../history/SearchHistory';

export interface ProductHeaderProps {
  inputValue: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  searchHistory: string[];
  onHistorySelect: (query: string) => void;
}

const ProductHeader = ({
  inputValue,
  onTextChange,
  onSubmit,
  searchHistory,
  onHistorySelect,
}: ProductHeaderProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleInputFocus = useCallback(() => setIsSearchFocused(true), []);
  const handleInputBlur = useCallback(() => setIsSearchFocused(false), []);

  return (
    <>
      <SearchBar
        onTextChange={onTextChange}
        onSubmit={onSubmit}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        placeholder="Search products"
        value={inputValue}
      />
      {isSearchFocused && (
        <SearchHistory
          data={searchHistory}
          onSelect={onHistorySelect}
        />
      )}
    </>
  );
};

export default memo(ProductHeader);
