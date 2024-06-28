import { Product } from '../../types/product';

const SearchItem = ({ product }: { product: Product }): JSX.Element => (
  <li className="form-search__select-item" tabIndex={0}>{product.name}</li>
);


SearchItem.displayName = 'SearchItem';

export default SearchItem;
