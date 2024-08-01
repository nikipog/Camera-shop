import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import CartFailureOrderModal from './cart-failure-order-modal';
import { withMemoryStoreWrapperAndContext } from '../../../../utils/mock-component';


describe('CartFailureOrderModal', () => {
  beforeEach(() => {

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<CartFailureOrderModal />);
    render(wrappedComponent);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    // Проверка, что компонент рендерится с правильным сообщением
    const failureMessage = screen.getByTestId('failure-order-message');
    expect(failureMessage).toBeInTheDocument();
    expect(failureMessage.textContent).toBe('Не удалось оформить заказ');

    // Проверка, что кнопки рендерятся
    const continueShoppingButton = screen.getByTestId('continue-shopping-button');
    expect(continueShoppingButton).toBeInTheDocument();
    expect(continueShoppingButton.textContent).toBe('Вернуться к покупкам');

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
});
