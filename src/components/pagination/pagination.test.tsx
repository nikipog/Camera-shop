import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import Pagination from './pagination';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { State } from '../../types/state';


describe('Pagination', () => {

  it('renders "Назад" button when current page > 3 ', () => {
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 4,
        totalPages: 5,
        maxProductsPerPage: 9
      },
    };

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <Pagination
        onPageChange={vi.fn()}
      />,
      initialState
    );

    render(wrappedComponent);

    expect(screen.getByText('Назад')).toBeInTheDocument();
  });

  it('renders "Далее" button when total pages > 3 and current page is not in the last page group ', () => {
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 3,
        totalPages: 10,
        maxProductsPerPage: 9
      },
    };

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <Pagination
        onPageChange={vi.fn()}
      />,
      initialState
    );

    render(wrappedComponent);

    expect(screen.getByText('Далее')).toBeInTheDocument();
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
      <Pagination
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
      <Pagination
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

  it('renders correct page numbers when current page is in the middle', () => {
    const initialState: Partial<State> = {
      pagination: {
        currentPage: 5,
        totalPages: 10,
        maxProductsPerPage: 9
      },
    };

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <Pagination
        onPageChange={vi.fn()}
      />,
      initialState
    );

    render(wrappedComponent);

    // Найти все элементы ссылок страниц
    const pageLinks = screen.getAllByRole('link');

    // Проверяю, что отображаемые страницы - это ожидаемые страницы для текущего состояния
    const displayedPages = pageLinks.map((link) => link.textContent);
    expect(displayedPages).toEqual(['Назад', '4', '5', '6', 'Далее']);
  });


});

