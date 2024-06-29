import { memo, useEffect, useRef, useState } from 'react';
import SearchList from '../search-list/search-list';
import { useAppSelector } from '../../hooks/store';
import { selectProducts } from '../../store/selectors/products-selectors';
import { Product } from '../../types/product';
import './search-input-field.css';

enum QueryLength {
  MinLengthForSearch = 3,
  Empty = 0,
}


const SearchInputField = memo(() => {

  const products = useAppSelector(selectProducts);

  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);


  const findQuery = (inputValue: string) => {
    const results = products.filter((product: Product) =>
      product.name.toLowerCase().trim().includes(inputValue.toLowerCase().trim())
    );
    setSearchResults(results);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value;
    if (value.length === QueryLength.Empty) {
      setQuery('');
    }
    setQuery(value);
    setIsListOpen(value.length >= QueryLength.MinLengthForSearch);
    if (value.length >= QueryLength.MinLengthForSearch) {
      findQuery(value);
    } else {
      setSearchResults([]); // Очистить результаты, если меньше 3 символов
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsListOpen(false);
    } else if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleResetButtonClick = () => {
    setIsListOpen(false);
    setSearchResults([]);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleResetButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleResetButtonClick();
    }
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      listRef.current &&
      !listRef.current.contains(event.target as Node)
    ) {
      setIsListOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={`form-search ${isListOpen ? 'list-opened' : ''}`}>
      <form onSubmit={handleFormSubmit}>
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
            ref={inputRef}
            value={query}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchInputChange}
            onKeyDown={handleInputKeyDown}


          />
        </label>

        <button

          className={`form-search__reset ${query !== '' ? 'visible' : ''}`}
          type="reset"
          onClick={handleResetButtonClick}
          onKeyDown={handleResetButtonKeyDown}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>

        <SearchList
          results={searchResults}
          onSearchResultClick={handleResetButtonClick}
          listRef={listRef} // Передаем ref для списка
        />
      </form>

    </div>
  );
});

SearchInputField.displayName = 'SearchInputField';

export default SearchInputField;

