import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { withMemoryStoreWrapperAndContext } from '../../../../utils/mock-component';
import CartSuccessOrderModal from './cart-success-order-modal';
import { RequestStatus } from '../../../../const';
import { State } from '../../../../types/state';

describe('CartSuccessOrderModal', () => {
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
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartSuccessOrderModal />, initialState);
    render(wrappedComponent);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    // Проверка, что компонент рендерится с правильным сообщением
    const successMessage = screen.getByText('Спасибо за покупку');
    expect(successMessage).toBeInTheDocument();

    // Проверка, что кнопки рендерятся
    const continueShoppingButton = screen.getByText('Вернуться к покупкам');
    expect(continueShoppingButton).toBeInTheDocument();

    const closeModalButton = screen.getByRole('button', { name: /закрыть попап/i });
    expect(closeModalButton).toBeInTheDocument();
  });

  it('should close the modal when overlay is clicked', () => {
    // Проверка, что модальное окно закрывается при клике на оверлей
    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    const modalRoot = screen.queryByRole('dialog');
    expect(modalRoot).not.toBeInTheDocument();
  });

  it('should close the modal when close button is clicked', () => {
    const closeModalButton = screen.getByRole('button', { name: /закрыть попап/i });
    fireEvent.click(closeModalButton);
    const modalRoot = screen.queryByRole('dialog');
    expect(modalRoot).not.toBeInTheDocument();
  });
});
