import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import SearchItem from './search-item';
import { MOCK_PRODUCT } from '../../utils/mocks';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { vi } from 'vitest';

type ReactRouterDomModule = typeof import('react-router-dom');

vi.mock('react-router-dom', async () => {
  const actual: ReactRouterDomModule = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('SearchItem', () => {
  const mockNavigate = vi.fn();
  const mockOnSearchResultClick = vi.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
  });

  it('renders product name correctly', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchItem
        product={MOCK_PRODUCT}
        onSearchResultClick={mockOnSearchResultClick}
        focusRef={vi.fn()}
      />
    );

    render(wrappedComponent);

    expect(screen.getByText(MOCK_PRODUCT.name)).toBeInTheDocument();
  });

  it('handles click event correctly', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchItem
        product={MOCK_PRODUCT}
        onSearchResultClick={mockOnSearchResultClick}
        focusRef={vi.fn()}
      />
    );

    render(wrappedComponent);

    const searchItem = screen.getByText(MOCK_PRODUCT.name);
    fireEvent.click(searchItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${MOCK_PRODUCT.id}`);
    expect(mockOnSearchResultClick).toHaveBeenCalled();
  });

  it('handles keydown event correctly', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <SearchItem
        product={MOCK_PRODUCT}
        onSearchResultClick={mockOnSearchResultClick}
        focusRef={vi.fn()}
      />
    );

    render(wrappedComponent);

    const searchItem = screen.getByText(MOCK_PRODUCT.name);
    fireEvent.keyDown(searchItem, { key: 'Enter' });

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${MOCK_PRODUCT.id}`);
    expect(mockOnSearchResultClick).toHaveBeenCalled();
  });
});
