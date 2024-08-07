import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { withMemoryStoreWrapperAndContext } from '../../../../utils/mock-component';
import CatalogAddModal from './catalog-add-modal';
import { RequestStatus } from '../../../../const';
import { MOCK_PRODUCT } from '../../../../utils/mocks';
import { State } from '../../../../types/state';
import { SelectedProductContext } from '../../../../context/selected-product-context';

describe('CatalogAddModal', () => {
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

  beforeAll(() => {
    window.scrollTo = () => {
      const noop = null;
      return noop;
    };
  });

  beforeEach(() => {
    const selectedProductContext = {
      selectedProduct: MOCK_PRODUCT,
      setSelectedProduct: vi.fn(),
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <SelectedProductContext.Provider value={selectedProductContext}>
        <CatalogAddModal />
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
    const addMessage = screen.getByText('Добавить товар в корзину');
    expect(addMessage).toBeInTheDocument();

    // Проверка, что кнопки рендерятся
    const addProductButton = screen.getByText('Добавить в корзину');
    expect(addProductButton).toBeInTheDocument();

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
