import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CatalogFilter from './catalog-filter';
import filterReducer from '../../store/slices/filters/filter';
import sortReducer from '../../store/slices/sort/sort';
import { sortType, sortOrder } from '../../types/sort';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('CatalogFilter', () => {
  const initialState = {
    filters: {
      priceRange: { min: 0, max: 100000 },
      priceInputValues: { minPriceInputValue: null, maxPriceInputValue: null },
      type: [],
      level: [],
      category: null, // Изменено на null
    },
    sort: {
      sortType: 'price' as sortType,
      sortOrder: 'asc' as sortOrder,
    },
  };

  const store = configureStore({
    reducer: {
      filters: filterReducer,
      sort: sortReducer,
    },
    preloadedState: initialState,
  });

  it('renders CatalogFilter component', () => {
    render(
      <Provider store={store}>
        <CatalogFilter />
      </Provider>
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });

  it('handles category change and reset correctly', () => {
    render(
      <Provider store={store}>
        <CatalogFilter />
      </Provider>
    );

    const videoCameraCategory = screen.getByLabelText(/Видеокамера/i);
    fireEvent.click(videoCameraCategory);
    expect(store.getState().filters.category).toBe('Видеокамера');

    fireEvent.click(screen.getByText(/Сбросить фильтры/i));
    expect(store.getState().filters.category).toBe(null); // Изменено на null
  });


  it('handles type and level changes', () => {
    render(
      <Provider store={store}>
        <CatalogFilter />
      </Provider>
    );

    const digitalCheckbox = screen.getByLabelText(/Цифровая/i);
    fireEvent.click(digitalCheckbox);
    expect(store.getState().filters.type).toContain('Цифровая');

    const professionalCheckbox = screen.getByLabelText(/Профессиональный/i);
    fireEvent.click(professionalCheckbox);
    expect(store.getState().filters.level).toContain('Профессиональный');
  });
});
