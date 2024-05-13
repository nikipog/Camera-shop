import { memo } from 'react';
import ProductCard from '../product-card/product-card';

const CatalogCardsContainer = memo((): JSX.Element => (
  <div className="cards catalog__cards">
    <ProductCard/>
  </div>
));


CatalogCardsContainer.displayName = 'CatalogCardsContainer';

export default CatalogCardsContainer;
