import { render, screen, fireEvent } from '@testing-library/react';
import SearchList from './search-list';
import { mockProducts } from '../../utils/mocks';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';

describe('SearchList', () => {
  const mockOnSearchResultClick = vi.fn();
  const listRef = { current: null };

  it('renders search results correctly', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchList
        results={mockProducts}
        onSearchResultClick={mockOnSearchResultClick}
        listRef={listRef}
      />
    );

    render(wrappedComponent);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('renders message when no results found', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchList
        results={[]}
        onSearchResultClick={mockOnSearchResultClick}
        listRef={listRef}
      />
    );

    render(wrappedComponent);

    expect(screen.getByText('Товары не найдены')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchList
        results={mockProducts}
        onSearchResultClick={mockOnSearchResultClick}
        listRef={listRef}
      />
    );

    render(wrappedComponent);

    const firstItem = screen.getByText(mockProducts[0].name);
    const secondItem = screen.getByText(mockProducts[1].name);

    // Фокус на первом элементе
    fireEvent.keyDown(screen.getByRole('list'), { key: 'Home' });
    expect(firstItem).toHaveFocus();

    // Переход к следующему элементу
    fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowDown' });
    expect(secondItem).toHaveFocus();

    // Переход к последнему элементу
    fireEvent.keyDown(screen.getByRole('list'), { key: 'End' });
    expect(secondItem).toHaveFocus(); // второй элемент и есть последний в mockProducts

    // Переход обратно к предыдущему элементу
    fireEvent.keyDown(screen.getByRole('list'), { key: 'ArrowUp' });
    expect(firstItem).toHaveFocus();
  });
});
