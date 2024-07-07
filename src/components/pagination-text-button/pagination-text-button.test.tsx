import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import PaginationTextButton from './pagination-text-button';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { State } from '../../types/state';


describe('PaginationTextButton', () => {

  it('renders "Назад" text for prev type', () => {
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 4,
        totalPages: 5,
        maxProductsPerPage: 9
      },
    };

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="prev"
        onPageChange={vi.fn()}
      />,
      initialState
    );

    render(wrappedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
  });

  it('renders "Далее" text for next type', () => {
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 2,
        totalPages: 5,
        maxProductsPerPage: 9
      },
    };

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="next"
        onPageChange={vi.fn()}
      />,
      initialState
    );

    render(wrappedComponent);

    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('calculates new page correctly for "prev" button', () => {
    // Определяю начальное состояние с текущей страницей 4 и общим количеством страниц 5
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 4,
        totalPages: 5,
        maxProductsPerPage: 9
      },
    };

    // Оборачиваю PaginationTextButton в необходимые провайдеры с заданным состоянием
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="prev"
        onPageChange={vi.fn()}
      />,
      initialState
    );

    // Имитирую рендеринг обернутого компонента
    render(wrappedComponent);

    // Нахожу кнопку с текстом "Назад"
    const button = screen.getByText('Назад');

    // Ищу ближайший родительский элемент <li> для найденной кнопки
    const listItem = button.closest('li');

    // Если элемент <li> найден, симулируем клик по нему и проверяем атрибут data-page
    if (listItem) {
      fireEvent.click(listItem);
      expect(listItem.getAttribute('data-page')).toBe('1');
    } else {
      throw new Error('List item not found');
    }
  });

  it('calculates new page correctly for "next" button', () => {
    // Определяю начальное состояние с текущей страницей 4 и общим количеством страниц 5
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 2,
        totalPages: 5,
        maxProductsPerPage: 9
      },
    };

    // Оборачиваю PaginationTextButton в необходимые провайдеры с заданным состоянием
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="next"
        onPageChange={vi.fn()}
      />,
      initialState
    );

    // Имитирую рендеринг обернутого компонента
    render(wrappedComponent);

    // Нахожу кнопку с текстом "Далее"
    const button = screen.getByText('Далее');

    // Ищу ближайший родительский элемент <li> для найденной кнопки
    const listItem = button.closest('li');

    // Если элемент <li> найден, симулируем клик по нему и проверяем атрибут data-page
    if (listItem) {
      fireEvent.click(listItem);
      expect(listItem.getAttribute('data-page')).toBe('4');
    } else {
      throw new Error('List item not found');
    }
  });

  it('calls onPageChange when "Назад" clicked', () => {
    // Определяю начальное состояние с текущей страницей 4 и общим количеством страниц 5
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 10,
        totalPages: 10,
        maxProductsPerPage: 9
      },
    };

    const onPageChange = vi.fn();

    // Оборачиваю PaginationTextButton в необходимые провайдеры с заданным состоянием
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="prev"
        onPageChange={onPageChange}
      />,
      initialState
    );

    // Имитирую рендеринг обернутого компонента
    render(wrappedComponent);

    // Нахожу кнопку с текстом "Назад"
    const button = screen.getByText('Назад');

    // Ищу ближайший родительский элемент <li> для найденной кнопки
    const listItem = button.closest('li');

    // Если элемент <li> найден, симулируем клик по нему и проверяем атрибут data-page
    if (listItem) {
      fireEvent.click(listItem);
      expect(onPageChange).toHaveBeenCalled();
    } else {
      throw new Error('List item not found');
    }
  });

  it('calls onPageChange when "Далее" clicked', () => {
    // Определяю начальное состояние с текущей страницей 4 и общим количеством страниц 5
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 7,
        totalPages: 10,
        maxProductsPerPage: 9
      },
    };

    const onPageChange = vi.fn();

    // Оборачиваю PaginationTextButton в необходимые провайдеры с заданным состоянием
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <PaginationTextButton
        type="next"
        onPageChange={onPageChange}
      />,
      initialState
    );

    // Имитирую рендеринг обернутого компонента
    render(wrappedComponent);

    // Нахожу кнопку с текстом "Далее"
    const button = screen.getByText('Далее');

    // Ищу ближайший родительский элемент <li> для найденной кнопки
    const listItem = button.closest('li');

    // Если элемент <li> найден, симулируем клик по нему и проверяем атрибут data-page
    if (listItem) {
      fireEvent.click(listItem);
      expect(onPageChange).toHaveBeenCalled();
    } else {
      throw new Error('List item not found');
    }
  });


});

