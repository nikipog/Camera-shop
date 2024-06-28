import { memo, useState } from 'react';
import SearchList from '../search-list/search-list';
import { useAppSelector } from '../../hooks/store';
import { selectProducts } from '../../store/selectors/products-selectors';
import { Product } from '../../types/product';
import './search-input-field.css';


const SearchInputField = memo(() => {

  const products = useAppSelector(selectProducts);

  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [query, setQuery] = useState<string | null>(null);


  const findQuery = (inputValue: string) => {
    const results = products.filter((product: Product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value;
    if (value.length === 0) {
      setQuery(null);
    }
    setQuery(value);
    setIsListOpen(value.length >= 3);
    if (value.length >= 3) {
      findQuery(value);
    } else {
      setSearchResults([]); // Очистить результаты, если меньше 3 символов
    }
  };

  const handleResetButtonClick = () => {
    setIsListOpen(false);
    setSearchResults([]);
    setQuery(null);
  };


  return (
    <div className={`form-search ${isListOpen ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchInputChange}
          />
        </label>

        <button

          className={`form-search__reset ${query !== null ? 'visible' : ''}`}
          type="reset"
          onClick={handleResetButtonClick}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>

        <SearchList results={searchResults} />
      </form>

    </div>
  );
});

SearchInputField.displayName = 'SearchInputField';

export default SearchInputField;

