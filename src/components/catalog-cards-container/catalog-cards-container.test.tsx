import { render, screen } from '@testing-library/react';
import CatalogCardsContainer from './catalog-cards-container';
import { mockProducts } from '../../utils/mocks';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';

// компонент принимает список продуктов и обработчик клика
// поэтому проверяем случай, когда продукты 1. есть 2. нет 3. вызов функции


describe('Component: CatalogCardsContainer', () => {
  it('should render correct', () => {
    const {wrappedComponent} = withMemoryAndStoreWrapper(
      <CatalogCardsContainer products={mockProducts} onProductClick={vi.fn()} />
    );


    const catalogCardsContainerTestId = 'catalog-cards-container';
    const cardValueTestId = 'card-value';

    render(wrappedComponent);
    const catalogCardContainer = screen.getByTestId(catalogCardsContainerTestId);
    const cardValues = screen.getAllByTestId(cardValueTestId);

    expect(catalogCardContainer).toBeInTheDocument();
    expect(cardValues).toHaveLength(mockProducts.length);

  });

  it('should render NoProducts when product list is empty', () => {
    render(<CatalogCardsContainer products={[]} onProductClick={vi.fn()} />);

    expect(screen.getByText(/Товары не найдены/i)).toBeInTheDocument();
  });

});
