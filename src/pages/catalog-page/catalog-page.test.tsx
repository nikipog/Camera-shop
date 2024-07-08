import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import CatalogPage from './catalog-page';
import productsReducer, { initialState as productsInitialState } from '../../store/slices/products/products';
import filtersReducer, { initialState as filtersInitialState } from '../../store/slices/filters/filter';
import sortReducer, { initialState as sortInitialState } from '../../store/slices/sort/sort';
import paginationReducer, { initialState as paginationInitialState } from '../../store/slices/pagination/pagination';
import { Product } from '../../types/product';
import { RequestStatus } from '../../const';
import { vi } from 'vitest';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';

// Частичное мокирование react-helmet-async
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  category: 'Фотоаппарат',
  type: 'Цифровая',
  level: 'Профессиональный',
  price: 5000,
  rating: 4.5,
  description: 'Test Description',
  previewImg: 'test.jpg',
  previewImg2x: 'test@2x.jpg',
  previewImgWebp: 'test.webp',
  previewImgWebp2x: 'test@2x.webp',
  reviewCount: 10,
  vendorCode: '12345', // добавленное свойство
};

describe('CatalogPage', () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      sort: sortReducer,
      pagination: paginationReducer,
    },
    preloadedState: {
      products: {
        ...productsInitialState,
        products: [mockProduct],
        status: RequestStatus.Success,
      },
      filters: filtersInitialState,
      sort: sortInitialState,
      pagination: paginationInitialState,
    },
  });

  it('renders CatalogPage component', () => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CatalogPage />, store.getState());
    render(wrappedComponent);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

});
