import { memo } from 'react';
import { IProduct } from '../../types/IProduct';
import './ProductCard.css';

export interface ProductCardProps {
  data: IProduct;
}

const formatPrice = (price: number) => `$ ${price.toLocaleString('en-IN')}`;

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <article className="product-card">
      <img
        alt={data.name}
        className="product-card__image"
        loading="lazy"
        src={data.imageUrl}
      />
      <div className="product-card__details">
        <h2 className="product-card__name">{data.name}</h2>
        <div className="product-card__prices">
          <span className="product-card__price">{formatPrice(data.price ?? 0)}</span>
          {data.msrp && data.msrp > (data.price ?? 0) && (
            <s className="product-card__max-price">{formatPrice(data.msrp)}</s>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);