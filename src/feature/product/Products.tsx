import { useCallback, useState } from 'react';
import SortOptions from '../../components/SortOptions';
import ProductFilters, { SelectedFilters } from '../../components/ProductFilters/ProductFilters';
import SelectedFilterPills from '../../components/SelectedFilterPills/SelectedFilterPills';
import useSearchQuery from '../../hooks/useSearchQuery';
import useSearchHistory from '../../hooks/useSearchHistory';
import useProduct from '../../hooks/useProduct';
import ProductPagination, { PaginationDirection } from '../pagination';
import ProductHeader from './ProductHeader';
import ProductsResults from './ProductsResults';
import { PRODUCT_SORT_OPTIONS } from '../../constants/Constant';
import './Products.css';

type SortOption = keyof typeof PRODUCT_SORT_OPTIONS;

const sortOptionList = Object.entries(PRODUCT_SORT_OPTIONS).map(([value, option]) => ({
  label: option.label,
  value,
}));

const Products = () => {
  const {
    inputValue,
    searchQuery,
    setInputValue,
    submitSearch,
    sortQuery,
    setSortQuery,
    filterQuery,
    setFilterQuery,
  } = useSearchQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDirection, setLoadingDirection] = useState<PaginationDirection | null>(null);
  
  const sortOption: SortOption = Object.prototype.hasOwnProperty.call(PRODUCT_SORT_OPTIONS, sortQuery)
    ? sortQuery as SortOption
    : 'relevance';

  const { history: searchHistory, addSearch } = useSearchHistory();
  const { data, error, loading, products, facets } = useProduct({
    searchQuery,
    currentPage,
    sortQuery,
    filterQuery,
  });

  const handleSearchSubmit = () => {
    addSearch(inputValue);
    setCurrentPage(1);
    submitSearch();
  };

  const handleHistorySelect = useCallback((query: string) => {
    setInputValue(query);
  }, [setInputValue]);

  const handleSortChange = useCallback((value: string) => {
    setCurrentPage(1);
    setSortQuery(value);
  }, [setSortQuery]);

  const handleFilterChange = (field: string, value: string) => {
    const currentValues = filterQuery[field] ?? [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((currentValue) => currentValue !== value)
      : [...currentValues, value];
    const nextFilters: SelectedFilters = { ...filterQuery };

    if (nextValues.length > 0) {
      nextFilters[field] = nextValues;
    } else {
      delete nextFilters[field];
    }

    setCurrentPage(1);
    setFilterQuery(nextFilters);
  };

  const handleClearFilters = useCallback(() => {
    setCurrentPage(1);
    setFilterQuery({});
  }, [setFilterQuery]);

  const handleNextPress = () => {
    setLoadingDirection('next');
    setCurrentPage((page) => page + 1);
  };

  const handlePreviousPress = () => {
    setLoadingDirection('previous');
    setCurrentPage((page) => page - 1);
  };

  const paginationProps = data?.pagination
    ? {
        data: data.pagination,
        loading,
        loadingDirection,
        onNextPress: handleNextPress,
        onPreviousPress: handlePreviousPress,
      }
    : null;

  return (
    <main className="products-page">
      <ProductHeader
        inputValue={inputValue}
        onTextChange={setInputValue}
        onSubmit={handleSearchSubmit}
        searchHistory={searchHistory}
        onHistorySelect={handleHistorySelect}
      />
      <div className="products-page__content">
        <ProductFilters
          facets={facets}
          onChange={handleFilterChange}
          onClearAll={handleClearFilters}
          selectedFilters={filterQuery}
        />
        <div className="products-page__results">
          <SelectedFilterPills
            facets={facets}
            onClearAll={handleClearFilters}
            onRemove={handleFilterChange}
            selectedFilters={filterQuery}
          />
      <div className="products-page__toolbar">
        <SortOptions
          onSelect={handleSortChange}
          options={sortOptionList}
          value={sortOption}
        />
        {paginationProps && <ProductPagination {...paginationProps} />}
      </div>
      <ProductsResults
        products={products}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
      />
      {paginationProps && <ProductPagination {...paginationProps} />}
        </div>
      </div>
    </main>
  );
};

export default Products;