import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogCardsContainer from './catalog-cards-container';
import { mockProducts } from '../../utils/mocks';

// компонент принимает список продуктов и обработчик клика
// поэтому проверяем случай, когда продукты 1. есть 2. нет 3. вызов функции


describe('Component: CatalogCardsContainer', () => {
  it('should render NoProducts when product list is empty', () => {
    render(<CatalogCardsContainer products={[]} onProductClick={vi.fn()} />);

    expect(screen.getByText(/Товары не найдены/i)).toBeInTheDocument();
  });

  it('should render ProductCard for each product', () => {
    render(<CatalogCardsContainer products={mockProducts} onProductClick={vi.fn()} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(screen.getByText(`${product.price} ₽`)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toBeInTheDocument();
    });
  });

  it('should call onProductClick when a product is clicked', async () => {
    const onProductClick = vi.fn();
    render(<CatalogCardsContainer products={mockProducts} onProductClick={onProductClick} />);

    await userEvent.click(screen.getByText(mockProducts[0].name));

    expect(onProductClick).toHaveBeenCalledWith(expect.anything(), mockProducts[0]);
  });
});
