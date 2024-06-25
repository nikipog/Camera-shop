import { memo, useEffect, useState } from 'react';
import { RootState } from '../../types/store';
import { setCategory, toggleType, toggleLevel, resetFilters, setPriceInputValues } from '../../store/slices/filters/filter';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { toast } from 'react-toastify';
import { ForbiddenVideocategories, PriceInputNames, ToastifyMessages } from '../../const';


const CatalogFilter = memo(() => {

  const VIDEOCAMERA_CATEGORY = 'Видеокамера';

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const minPrice = filters.priceRange.min;
  const maxPrice = filters.priceRange.max;

  const [localMinPrice, setLocalMinPrice] = useState<number | null>(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number | null>(maxPrice);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);


  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    dispatch(setCategory(category));

    if (category === VIDEOCAMERA_CATEGORY) {
      // Проверяем текущие фильтры и сбрасываем только недоступные
      filters.type.forEach((type) => {
        if (type === ForbiddenVideocategories.InstantType || type === ForbiddenVideocategories.FilmType) {
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
      setLocalMinPrice(Number(value));

    } else {
      setLocalMaxPrice(Number(value));
    }
  };

  const { minPriceInputValue, maxPriceInputValue } = useAppSelector((state: RootState) => state.filters.priceInputValues);


  const handlePriceBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newPrice = Number(value);

    if (name === PriceInputNames.MinPrice) {
      if (maxPrice !== null && newPrice > maxPrice) {
        toast.error(ToastifyMessages.PriceFromExceedsToError);
        setLocalMinPrice(minPrice); // Сброс цены к предыдущему значению
        return;
      }

      if (minPrice !== null && newPrice < minPrice) {
        toast.error(ToastifyMessages.InputValueLessThanPriceTo(minPrice));
        setLocalMinPrice(minPrice);
        return;
      }

      if (newPrice !== minPriceInputValue && (maxPrice === null || newPrice <= maxPrice)) {
        dispatch(setPriceInputValues({ minPriceInputValue: newPrice, maxPriceInputValue }));
      }
    } else if (name === PriceInputNames.MaxPrice) {
      if (minPrice !== null && newPrice < minPrice) {
        toast.error(ToastifyMessages.PriceToLessThenFromError);
        setLocalMaxPrice(maxPrice);
        return;
      }
      if (maxPrice !== null && newPrice > maxPrice) {
        toast.error(ToastifyMessages.InputValueExceedsToError(maxPrice));
        setLocalMaxPrice(maxPrice);
        return;
      }

      if (newPrice !== maxPriceInputValue) {
        dispatch(setPriceInputValues({ minPriceInputValue, maxPriceInputValue: newPrice }));
      }
    }
  };


  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
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
                  value={localMinPrice === null ? '' : localMinPrice}
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
                  value={localMaxPrice === null ? '' : localMaxPrice}
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


