import { render, screen, within } from '@testing-library/react';
import CartList from './cart-list';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';
import { MOCK_PRODUCT } from '../../utils/mocks';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';

describe('Component: CartList', () => {
  it('should render correctly with products in the list', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT, { ...MOCK_PRODUCT, id: 2, name: 'FastShot MR-5', vendorCode: 'JH34KHN895', quantity: 1 }],
        totalQuantity: 3,
        totalPrice: 89000,
        discountPercent: 0,
        totalPriceWithDiscount: 89000,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartList addedProducts={[MOCK_PRODUCT, { ...MOCK_PRODUCT, id: 2, name: 'FastShot MR-5', vendorCode: 'JH34KHN895', quantity: 1 }]} />, initialState);

    render(wrappedComponent);

    expect(screen.getByText(/Prof Lite Zero/i)).toBeInTheDocument();
    expect(screen.getByText(/FastShot MR-5/i)).toBeInTheDocument();

    const list = screen.getByTestId('cart-list');
    const items = within(list).getAllByTestId(/^cart-item-\d+$/);
    expect(items).toHaveLength(2);
  });

  it('should render correctly with an empty list', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [],
        totalQuantity: 0,
        totalPrice: 0,
        discountPercent: 0,
        totalPriceWithDiscount: 0,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartList addedProducts={[]} />, initialState);

    render(wrappedComponent);

    expect(screen.queryByText(/Prof Lite Zero/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/FastShot MR-5/i)).not.toBeInTheDocument();

    const list = screen.getByTestId('cart-list');
    const items = within(list).queryAllByTestId(/^cart-item-\d+$/);
    expect(items).toHaveLength(0);
  });
});
