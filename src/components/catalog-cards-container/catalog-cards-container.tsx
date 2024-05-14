import { memo } from 'react';
import ProductCard from '../product-card/product-card';
import { Product } from '../../types/product';
import NoProducts from '../no-products/no-products';

type CatalogCardsContainerProps = {
  products: Product[];
}

const CatalogCardsContainer = memo(({ products }: CatalogCardsContainerProps): JSX.Element => (
  <div className="cards catalog__cards">
    {!products.length ? <NoProducts /> :
      products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
  </div>
));


CatalogCardsContainer.displayName = 'CatalogCardsContainer';

export default CatalogCardsContainer;
