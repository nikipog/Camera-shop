import { Product } from '../../types/product';
import SearchItem from '../search-item/search-item';

const SearchList = ({ results }: { results: Product[] }): JSX.Element => (
  <ul className="form-search__select-list">
    {results && results.map((product) => (
      <SearchItem key={product.id} product={product} />
    ))} {results.length === 0 && 'Товары не найдены'}
  </ul>
);


SearchList.displayName = 'SearchList';

export default SearchList;
