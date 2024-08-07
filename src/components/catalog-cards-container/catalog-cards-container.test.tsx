import { render, screen } from '@testing-library/react';
import CatalogCardsContainer from './catalog-cards-container';
import { mockProducts } from '../../utils/mocks';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';

describe('Component: CatalogCardsContainer', () => {
  it('should render correct', () => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <CatalogCardsContainer products={mockProducts} onProductClick={vi.fn()} />,
      {
        'shopping-cart': {
          addedProducts: [],
          totalPrice: 0,
          totalQuantity: 0,
          discountPercent: 0,
          totalPriceWithDiscount: 0,
        }
      }
    );

    render(wrappedComponent);

    const catalogCardsContainerTestId = 'catalog-cards-container';
    const cardValueTestId = 'card-value';

    const catalogCardContainer = screen.getByTestId(catalogCardsContainerTestId);
    const cardValues = screen.getAllByTestId(cardValueTestId);

    expect(catalogCardContainer).toBeInTheDocument();
    expect(cardValues).toHaveLength(mockProducts.length);
  });

  it('should render NoProducts when product list is empty', () => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <CatalogCardsContainer products={[]} onProductClick={vi.fn()} />,
      {
        'shopping-cart': {
          addedProducts: [],
          totalPrice: 0,
          totalQuantity: 0,
          discountPercent: 0,
          totalPriceWithDiscount: 0,
        }
      }
    );

    render(wrappedComponent);

    expect(screen.getByText(/Товары не найдены/i)).toBeInTheDocument();
  });
});
