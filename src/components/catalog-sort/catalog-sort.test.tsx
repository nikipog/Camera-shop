import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CatalogSort from './catalog-sort';
import sortReducer from '../../store/slices/sort/sort';
import { SortTypesAndOrder } from '../../const';

describe('CatalogSort', () => {
  it('renders and allows sorting by price and popularity', () => {
    const store = configureStore({
      reducer: {
        sort: sortReducer,
      },
    });

    render(
      <Provider store={store}>
        <CatalogSort />
      </Provider>
    );

    // Проверка отображения основных элементов
    expect(screen.getByLabelText('по цене')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности')).toBeInTheDocument();
    expect(screen.getByLabelText('По возрастанию')).toBeInTheDocument();
    expect(screen.getByLabelText('По убыванию')).toBeInTheDocument();

    // Выбор сортировки по популярности
    fireEvent.click(screen.getByLabelText('по популярности'));
    expect(store.getState().sort.sortType).toBe(SortTypesAndOrder.SortByPopular);

    // Выбор сортировки по убыванию
    fireEvent.click(screen.getByLabelText('По убыванию'));
    expect(store.getState().sort.sortOrder).toBe(SortTypesAndOrder.SortOrderDown);
  });
});
