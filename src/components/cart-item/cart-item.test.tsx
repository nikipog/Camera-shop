import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';
import { MOCK_PRODUCT } from '../../utils/mocks';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [{ ...MOCK_PRODUCT, quantity: 2 }],
        totalQuantity: 2,
        totalPrice: 70000,
        discountPercent: 0,
        totalPriceWithDiscount: 70000,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartItem addedProduct={{ ...MOCK_PRODUCT, quantity: 2 }} />, initialState);

    render(wrappedComponent);

    expect(screen.getByText(/Prof Lite Zero/i)).toBeInTheDocument();
    expect(screen.getByText(/PL34ZO/i)).toBeInTheDocument();
    expect(screen.getByText(/Цифровая видеокамера/i)).toBeInTheDocument();
    expect(screen.getByText(/Нулевой уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/35 000 ₽/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(2);
  });

  it('should handle increment and decrement correctly', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 2,
        totalPrice: 70000,
        discountPercent: 0,
        totalPriceWithDiscount: 70000
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent, mockStore } = withMemoryStoreWrapperAndContext(<CartItem addedProduct={MOCK_PRODUCT} />, initialState);

    render(wrappedComponent);

    fireEvent.click(screen.getByLabelText('увеличить количество товара'));
    expect(mockStore.getActions()).toContainEqual(expect.objectContaining({ type: 'shopping-cart/addProduct' }));

    fireEvent.click(screen.getByLabelText('уменьшить количество товара'));
    expect(mockStore.getActions()).toContainEqual(expect.objectContaining({ type: 'shopping-cart/decrementProductQuantity' }));
  });

  it('should handle quantity input change correctly', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 2,
        totalPrice: 70000,
        discountPercent: 0,
        totalPriceWithDiscount: 70000
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent, mockStore } = withMemoryStoreWrapperAndContext(<CartItem addedProduct={MOCK_PRODUCT} />, initialState);

    render(wrappedComponent);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    expect(mockStore.getActions()).toContainEqual(expect.objectContaining({ type: 'shopping-cart/setProductQuantity' }));
  });

  it('should handle product removal correctly', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 2,
        totalPrice: 70000,
        discountPercent: 0,
        totalPriceWithDiscount: 70000
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartItem addedProduct={MOCK_PRODUCT} />, initialState);

    render(wrappedComponent);

    fireEvent.click(screen.getByLabelText('Удалить товар'));
    // Здесь мы должны проверить, что модалка открылась и продукт был выбран
  });
});
