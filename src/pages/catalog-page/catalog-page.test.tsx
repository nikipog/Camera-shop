import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import thunk from 'redux-thunk';
import CatalogPage from './catalog-page';
import { RequestStatus } from '../../const';
import filterReducer from '../../store/slices/filters/filter';
import paginationReducer from '../../store/slices/pagination/pagination';
import productReducer from '../../store/slices/product/product';
import reviewReducer from '../../store/slices/reviews/reviews';
import shoppingCartReducer from '../../store/slices/shopping-cart/shopping-cart';
import sortReducer from '../../store/slices/sort/sort';
import productsReducer from '../../store/slices/products/products';
import { RootState } from '../../types/store';
import { ModalProvider } from '../../context/modal-context';
import { SelectedProductProvider } from '../../context/selected-product-context';


const createMockStore = (initialState: Partial<RootState>) => configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    sort: sortReducer,
    pagination: paginationReducer,
    reviews: reviewReducer,
    'shopping-cart': shoppingCartReducer,
    product: productReducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

describe('CatalogPage', () => {
  const initialState: Partial<RootState> = {
    products: { products: [], status: RequestStatus.Idle },
    filters: {
      category: null,
      type: [],
      level: [],
      priceInputValues: { minPriceInputValue: null, maxPriceInputValue: null },
      priceRange: { min: null, max: null },
    },
    sort: { sortType: 'sortPrice', sortOrder: 'up' },
    pagination: { currentPage: 1, totalPages: null, maxProductsPerPage: 10 },
  };

  const renderComponent = (state = initialState) => {
    const store = createMockStore(state);
    return render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <ModalProvider>
              <SelectedProductProvider>
                <CatalogPage />
              </SelectedProductProvider>
            </ModalProvider>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );
  };

  it('should render CatalogPage', () => {
    renderComponent();
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    const loadingState: Partial<RootState> = {
      ...initialState,
      products: { products: [], status: RequestStatus.Loading },
    };

    renderComponent(loadingState);

    expect(screen.getByText('Загрузка ...')).toBeInTheDocument();
  });

});
