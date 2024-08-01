import { render, screen } from '@testing-library/react';
import CartSummary from './cart-summary';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';
import { MOCK_PRODUCT } from '../../utils/mocks';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: CartSummary', () => {
  it('should render correctly with products in the cart', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 1,
        totalPrice: 35000,
        totalPriceWithDiscount: 30000,
        discountPercent: 0,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartSummary />, initialState);

    render(wrappedComponent);

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/35 000 ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/5 000 ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/30 000 ₽/i)).toBeInTheDocument();
  });

  it('should disable order button when cart is empty', () => {
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

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartSummary />, initialState);

    render(wrappedComponent);

    const orderButton = screen.getByRole('button', { name: /Оформить заказ/i });
    expect(orderButton).toBeDisabled();
  });

  it('should handle order button click correctly', async () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 1,
        totalPrice: 35000,
        totalPriceWithDiscount: 30000,
        discountPercent: 0,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent, mockStore } = withMemoryStoreWrapperAndContext(<CartSummary />, initialState);

    render(wrappedComponent);

    const orderButton = screen.getByRole('button', { name: /Оформить заказ/i });
    await userEvent.click(orderButton);

    const actions = mockStore.getActions();
    expect(actions).toContainEqual(expect.objectContaining({ type: 'orders/post/pending' }));
  });

  it('should handle promo code application', async () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 1,
        totalPrice: 35000,
        totalPriceWithDiscount: 30000,
        discountPercent: 0,
      },
      orders: {
        status: RequestStatus.Idle,
        camerasIds: [],
        coupon: null,
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartSummary />, initialState);

    render(wrappedComponent);

    const input = screen.getByPlaceholderText(/Введите промокод/i);
    await userEvent.type(input, 'DISCOUNT');
    const applyButton = screen.getByRole('button', { name: /Применить/i });
    await userEvent.click(applyButton);

    // Здесь мы должны проверить, что действие для применения промокода было вызвано
    // Пример:
    // const actions = mockStore.getActions();
    // expect(actions).toContainEqual(expect.objectContaining({ type: 'shopping-cart/applyPromoCode' }));
  });
});
