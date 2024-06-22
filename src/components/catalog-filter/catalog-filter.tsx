import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/store';
import { setCategory, toggleType, toggleLevel, setPriceRange, resetFilters } from '../../store/slices/filters/filter';
import { useAppDispatch } from '../../hooks/store';


const CatalogFilter = memo(() => {

  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    dispatch(setCategory(category));

    if (category === 'Видеокамера') {
      // Проверяем текущие фильтры и сбрасываем только недоступные
      filters.type.forEach((type) => {
        if (type === 'Моментальная' || type === 'Плёночная') {
          dispatch(toggleType(type));
        }
      });
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleType(event.target.name));
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleLevel(event.target.name));
  };


  const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handlePriceBlur = () => {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (min <= max) {
      dispatch(setPriceRange({ min, max }));
    } else {
      // Обработка ошибки - например, можно показать уведомление
      console.error('Минимальная цена должна быть меньше или равна максимальной');
    }
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setMinPrice('');
    setMaxPrice('');
  };


  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="от"
                  value={minPrice}
                  onChange={handlePriceInputChange}
                  onBlur={handlePriceBlur}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="до"
                  value={maxPrice}
                  onChange={handlePriceInputChange}
                  onBlur={handlePriceBlur}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="Фотоаппарат"
                onChange={handleCategoryChange}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="Видеокамера"
                onChange={handleCategoryChange}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Цифровая"
                onChange={handleTypeChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Плёночная"
                onChange={handleTypeChange}
                checked={filters.type.includes('Плёночная')}
                disabled={filters.category === 'Видеокамера'}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Моментальная"
                onChange={handleTypeChange}
                checked={filters.type.includes('Моментальная')}
                disabled={filters.category === 'Видеокамера'}

              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Коллекционная"
                onChange={handleTypeChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Нулевой"
                onChange={handleLevelChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Любительский"
                onChange={handleLevelChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="Профессиональный"
                onChange={handleLevelChange}

              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetFilters}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
});

CatalogFilter.displayName = 'CatalogFilter';

export default CatalogFilter;


