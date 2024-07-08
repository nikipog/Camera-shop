import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { useModalRules } from '../../../hooks/modal-rules';
import { useSelectedProduct } from '../../../hooks/select-product';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { ordersThunk } from '../../../store/thunks/order/order';
import CatalogCallModal from './catalog-call-modal';
import { RequestStatus } from '../../../const';
import { selectOrderStatus } from '../../../store/selectors/order-selectors';
import { Product } from '../../../types/product';

vi.mock('../../../hooks/modal-rules', () => ({
  useModalRules: vi.fn(),
}));

vi.mock('../../../hooks/select-product', () => ({
  useSelectedProduct: vi.fn(),
}));

vi.mock('../../../hooks/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../../store/thunks/order/order', () => ({
  ordersThunk: {
    postOrder: vi.fn(),
  },
}));

vi.mock('../../../store/selectors/order-selectors', () => ({
  selectOrderStatus: vi.fn(),
}));

describe('CatalogCallModal', () => {
  const mockProduct: Product = {
    id: 1,
    category: 'Видеокамера',
    name: 'Ретрокамера',
    vendorCode: '12345',
    type: 'Цифровая',
    level: 'Профессиональный',
    previewImg: 'img/content/preview.jpg',
    previewImg2x: 'img/content/preview@2x.jpg',
    previewImgWebp: 'img/content/preview.webp',
    previewImgWebp2x: 'img/content/preview@2x.webp',
    price: 10000,
    description: 'Описание',
    rating: 5,
    reviewCount: 10,
  };

  beforeEach(() => {
    (useModalRules as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalRef: { current: null },
      overlayRef: { current: null },
      handleCloseModal: vi.fn(),
    });

    (useSelectedProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedProduct: mockProduct,
      setSelectedProduct: vi.fn(),
    });

    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(vi.fn());
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: unknown) => {
      if (selector === selectOrderStatus) {
        return RequestStatus.Idle;
      }
    });
  });


  it('handles phone input validation and submission', async () => {
    const dispatchMock = vi.fn().mockResolvedValue(Promise.resolve());
    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(dispatchMock);
    (ordersThunk.postOrder as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});

    render(<CatalogCallModal />);

    const phoneInput = screen.getByPlaceholderText(/Введите ваш номер/i);
    const orderButton = screen.getByRole('button', { name: /Заказать/i });

    fireEvent.input(phoneInput, { target: { value: '12345' } });
    fireEvent.click(orderButton);

    expect(screen.getByText(/Укажите номер в формате \+7\(9XX\)XXX-XX-XX/i)).toBeInTheDocument();

    fireEvent.input(phoneInput, { target: { value: '+79123456789' } });
    fireEvent.click(orderButton);

    await new Promise(process.nextTick); // wait for the state update

    expect(dispatchMock).toHaveBeenCalledWith(
      ordersThunk.postOrder({
        body: {
          camerasIds: [mockProduct.id],
          coupon: null,
          tel: '+79123456789',
        },
      })
    );
  });

  it('closes the modal when close button is clicked', () => {
    const handleCloseModalMock = vi.fn();
    (useModalRules as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalRef: { current: null },
      overlayRef: { current: null },
      handleCloseModal: handleCloseModalMock,
    });

    render(<CatalogCallModal />);

    const closeButton = screen.getByLabelText(/Закрыть попап/i);
    fireEvent.click(closeButton);

    expect(handleCloseModalMock).toHaveBeenCalled();
  });
});
