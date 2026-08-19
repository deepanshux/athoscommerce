import { memo } from 'react';
import { IProductPagination } from '../../types/IProduct';
import ActivityIndicator from '../../components/ActivityIndicator';
import './ProductPagination.css';

export type PaginationDirection = 'next' | 'previous';

export interface ProductPaginationProps {
  data: IProductPagination;
  loading: boolean;
  loadingDirection: PaginationDirection | null;
  onNextPress: () => void;
  onPreviousPress: () => void;
}

const ProductPagination = ({
  data,
  loading,
  loadingDirection,
  onNextPress,
  onPreviousPress,
}: ProductPaginationProps) => {
  const isFirstPage = data.currentPage <= 1;
  const isLastPage = data.currentPage >= data.totalPages;

  return (
    <nav className="product-pagination" aria-label="Product pagination">
      <button
        className="product-pagination__button"
        disabled={isFirstPage || loading}
        onClick={onPreviousPress}
        type="button"
      >
        <span>Previous</span>
        <span className="product-pagination__loader">
          <ActivityIndicator loading={loadingDirection === 'previous' && loading} />
        </span>
      </button>
      <span className="product-pagination__page">
        Page {data.currentPage} of {data.totalPages}
      </span>
      <button
        className="product-pagination__button"
        disabled={isLastPage || loading}
        onClick={onNextPress}
        type="button"
      >
        <span>Next</span>
        <span className="product-pagination__loader">
          <ActivityIndicator loading={loadingDirection === 'next' && loading} />
        </span>
      </button>
    </nav>
  );
};

export default memo(ProductPagination);