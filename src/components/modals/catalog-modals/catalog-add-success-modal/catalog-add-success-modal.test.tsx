import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CatalogAddSuccessModal from './catalog-add-success-modal';
import { withMemoryStoreWrapperAndContext } from '../../../../utils/mock-component';

describe('CatalogAddSuccessModal', () => {
  beforeEach(() => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(

      <CatalogAddSuccessModal />,

      {}
    );
    render(wrappedComponent);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    // Проверка, что компонент рендерится с правильным сообщением
    const successMessage = screen.getByText('Товар успешно добавлен в корзину');
    expect(successMessage).toBeInTheDocument();

    // Проверка, что кнопки рендерятся
    const continueShoppingButton = screen.getByText('Продолжить покупки');
    expect(continueShoppingButton).toBeInTheDocument();

    const goToCartButton = screen.getByText('Перейти в корзину');
    expect(goToCartButton).toBeInTheDocument();

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
