import { SelectedFilters } from '../components/ProductFilters/ProductFilters';
import { Routes } from '../api/routes';
import { PRODUCT_SORT_OPTIONS } from '../constants/Constant';
import useFetch from './useFetch';
import { IProductResponse } from '../types/IProduct';
import { normalizeFacets } from '../utils/facets';

const RESULTS_PER_PAGE = 15;

type SortOption = keyof typeof PRODUCT_SORT_OPTIONS;

interface UseProductParams {
  searchQuery: string;
  currentPage: number;
  sortQuery: string;
  filterQuery: SelectedFilters;
}

const useProduct = ({
  searchQuery,
  currentPage,
  sortQuery,
  filterQuery,
}: UseProductParams) => {
  const sortOption: SortOption = Object.prototype.hasOwnProperty.call(PRODUCT_SORT_OPTIONS, sortQuery)
    ? sortQuery as SortOption
    : 'relevance';
  const selectedSortOption = PRODUCT_SORT_OPTIONS[sortOption];
  const sortParams = selectedSortOption.field && selectedSortOption.direction
    ? { [`sort.${selectedSortOption.field}`]: selectedSortOption.direction }
    : {};

  const { data, error, loading } = useFetch<IProductResponse>(
    searchQuery ? Routes.products.url : null,
    {
      method: Routes.products.method,
      params: {
        q: searchQuery,
        resultsPerPage: RESULTS_PER_PAGE,
        page: currentPage,
        ...sortParams,
        ...Object.entries(filterQuery).reduce<Record<string, string>>((params, [field, values]) => {
          if (field === 'price') {
            const [low, high] = values[0]?.split('to') ?? [];
            if (low && high) {
              params['filter.price.low'] = low;
              params['filter.price.high'] = high;
            }
          } else if (values.length > 0) {
            params[`filter.${field}`] = values.join(',');
          }
          return params;
        }, {}),
      },
    },
  );

  return {
    data,
    error,
    loading,
    products: data?.results ?? [],
    facets: normalizeFacets(data?.features, data?.facets),
  };
};

export default useProduct;
