import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import CartPage from './cart-page';
import { RequestStatus } from '../../const';
import { State } from '../../types/state';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';

describe('CartPage', () => {
  const initialState: Partial<State> = {
    'shopping-cart': {
      addedProducts: [],
      totalQuantity: 0,
      totalPrice: 0,
      totalPriceWithDiscount: 0,
      discountPercent: 0,
    },
    orders: {
      status: RequestStatus.Idle,
      camerasIds: [],
      coupon: null,
    },
  };

  beforeEach(() => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartPage />, initialState);
    render(wrappedComponent);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Корзина' });
    expect(pageTitle).toBeInTheDocument();

    const breadcrumbs = screen.getAllByRole('link');
    expect(breadcrumbs).toHaveLength(3);

    const cartList = screen.getByTestId('cart-list');
    expect(cartList).toBeInTheDocument();

  });

  it('should display loading spinner when order status is loading', () => {
    const loadingState: Partial<State> = {
      ...initialState,
      orders: {
        status: RequestStatus.Loading,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartPage />, loadingState);
    render(wrappedComponent);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

});
