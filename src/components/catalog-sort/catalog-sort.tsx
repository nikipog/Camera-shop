import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setSortOrder, setSortType } from '../../store/slices/sort/sort';
import { sortOrder, sortType } from '../../types/sort';
import { SortTypesAndOrder } from '../../const';
import { selectSort } from '../../store/selectors/sort-selectors';


const CatalogSort = memo(() => {
  const stateSort = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const [localSortType, setLocalSortType] = useState<sortType>(SortTypesAndOrder.SortByPrice);
  const [localSortOrder, setLocalSortOrder] = useState<sortOrder>(SortTypesAndOrder.SortOrderUp);

  useEffect(() => {
    setLocalSortType(stateSort.sortType);
    setLocalSortOrder(stateSort.sortOrder);
  }, [stateSort]);


  const handleSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSortType = event.target.id as sortType;
    if (currentSortType !== stateSort.sortType) {
      dispatch(setSortType(currentSortType));
    }
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSortOrder = event.target.id as sortOrder;
    if (currentSortOrder !== stateSort.sortOrder) {
      dispatch(setSortOrder(currentSortOrder));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onChange={handleSortTypeChange}
                checked={localSortType === SortTypesAndOrder.SortByPrice}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={handleSortTypeChange}
                checked={localSortType === SortTypesAndOrder.SortByPopular}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={handleOrderChange}
                checked={localSortOrder === SortTypesAndOrder.SortOrderUp}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onChange={handleOrderChange}
                checked={localSortOrder === SortTypesAndOrder.SortOrderDown}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
});

CatalogSort.displayName = 'CatalogFilter';

export default CatalogSort;


