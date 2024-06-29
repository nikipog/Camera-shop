import { useNavigate, generatePath } from 'react-router-dom';
import { Product } from '../../types/product';
import { AppRoute } from '../../const';

type SearchItemProps = {
  product: Product;
  onSearchResultClick: () => void;
  focusRef: (el: HTMLLIElement | null) => void;
}

const SearchItem = ({ product, onSearchResultClick, focusRef }: SearchItemProps): JSX.Element => {

  const url = generatePath(AppRoute.Product, { id: product.id.toString() });
  const navigate = useNavigate();

  const handleSearchResultClick = () => {
    navigate(url);
    onSearchResultClick();
  };

  const handleSearchItemKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      handleSearchResultClick();
    }
  };


  return (

    <li
      className="form-search__select-item"
      tabIndex={0}
      onClick={handleSearchResultClick}
      onKeyDown={handleSearchItemKeyDown}
      ref={focusRef}
    >
      {product.name}
    </li>


  );
};


export default SearchItem;
