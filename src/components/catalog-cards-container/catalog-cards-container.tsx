import { memo } from 'react';
import ProductCard from '../product-card/product-card';
import { Product } from '../../types/product';
import NoProducts from '../no-products/no-products';

type CatalogCardsContainerProps = {
  products: Product[];
  onProductClick: (modalName: string, product: Product) => void;
}

const CatalogCardsContainer = memo(({ products, onProductClick }: CatalogCardsContainerProps): JSX.Element => (
  <div className="cards catalog__cards" data-testid="catalog-cards-container">
    {!products.length ? <NoProducts /> :
      products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}

        />
      ))}
  </div>
));


CatalogCardsContainer.displayName = 'CatalogCardsContainer';

export default CatalogCardsContainer;
