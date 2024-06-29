import { useCallback, useRef } from 'react';
import { Product } from '../../types/product';
import SearchItem from '../search-item/search-item';

enum ElementsOrder {
  FirstElementIndex = 0,
  IncrementStep = 1,
}

type SearchListProps = {
  results: Product[];
  onSearchResultClick: () => void;
  listRef: React.RefObject<HTMLUListElement>; // Добавляю prop для ref списка
}

const SearchList = ({ results, onSearchResultClick, listRef }: SearchListProps): JSX.Element => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleSearchListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'Tab') {
      event.preventDefault();

    }
    const currentIndex = itemRefs.current.findIndex((ref) => ref === document.activeElement);
    if (event.key === 'ArrowDown') {
      const nextIndex = (currentIndex + ElementsOrder.IncrementStep) % results.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      const prevIndex = (currentIndex - ElementsOrder.IncrementStep + results.length) % results.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (event.key === 'Home') {
      itemRefs.current[ElementsOrder.FirstElementIndex]?.focus();
    } else if (event.key === 'End') {
      itemRefs.current[results.length - ElementsOrder.IncrementStep]?.focus();
    }
  };

  const setFocusRef = useCallback((el: HTMLLIElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  return (
    <ul
      className="form-search__select-list"
      onKeyDown={handleSearchListKeyDown}
      ref={listRef}
    >
      {results && results.map((product, index) => (
        <SearchItem
          key={product.id}
          product={product}
          onSearchResultClick={onSearchResultClick}
          focusRef={(el) => {
            setFocusRef(el, index);
          }}
        />
      ))} {results.length === 0 && 'Товары не найдены'}
    </ul>
  );
};


export default SearchList;
