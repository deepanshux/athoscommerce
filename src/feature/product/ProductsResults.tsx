import ProductCard from '../../components/ProductCard';
import { IProduct } from '../../types/IProduct';

interface ProductsResultsProps {
  products: IProduct[];
  loading: boolean;
  error: Error | null;
  searchQuery: string;
}

const ProductsResults = ({ products, loading, error, searchQuery }: ProductsResultsProps) => {
  return (
    <>
      <section className="products-page__grid" aria-label="Products">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </section>
      {error && <p className="products-page__empty">{error.message}</p>}
      {!loading && !error && products.length === 0 && searchQuery && (
        <p className="products-page__empty">No products found.</p>
      )}
      {!loading && !error && products.length === 0 && searchQuery === '' && (
        <p className="products-page__empty">Search for products</p>
      )}
    </>
  );
};

export default ProductsResults;
