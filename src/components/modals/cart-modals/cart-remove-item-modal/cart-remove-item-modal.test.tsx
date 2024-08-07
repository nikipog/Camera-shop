import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { withMemoryStoreWrapperAndContext } from '../../../../utils/mock-component';
import CartRemoveItemModal from './cart-remove-item-modal';
import { RequestStatus } from '../../../../const';
import { MOCK_PRODUCT } from '../../../../utils/mocks';
import { State } from '../../../../types/state';
import { SelectedProductContext } from '../../../../context/selected-product-context';
import { vi } from 'vitest';

describe('CartRemoveItemModal', () => {
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

  beforeEach(() => {
    const selectedProductContext = {
      selectedProduct: MOCK_PRODUCT,
      setSelectedProduct: vi.fn(),
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <SelectedProductContext.Provider value={selectedProductContext}>
        <CartRemoveItemModal />
      </SelectedProductContext.Provider>,
      initialState
    );

    render(wrappedComponent);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    // Проверка, что компонент рендерится с правильным сообщением
    const deleteMessage = screen.getByTestId('remove-product-message');
    expect(deleteMessage).toBeInTheDocument();
    expect(deleteMessage.textContent).toBe('Удалить этот товар?');

    // Проверка, что кнопки рендерятся
    const continueShoppingButton = screen.getByTestId('continue-shopping-button');
    expect(continueShoppingButton).toBeInTheDocument();
    expect(continueShoppingButton.textContent).toBe('Продолжить покупки');

    const closeModalButton = screen.getByTestId('close-modal-button');
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
    const closeModalButton = screen.getByTestId('close-modal-button');
    fireEvent.click(closeModalButton);
    const modalRoot = screen.queryByRole('dialog');
    expect(modalRoot).not.toBeInTheDocument();
  });
});
