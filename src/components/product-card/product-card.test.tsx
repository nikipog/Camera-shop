import { fireEvent, MatcherFunction, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import ProductCard from './product-card';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { MOCK_PRODUCT } from '../../utils/mocks';


describe('ProductCard', () => {

  it('renders product card correctly', () => {


    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ProductCard
        product={MOCK_PRODUCT}
        onProductClick={vi.fn()}
      />
    );

    render(wrappedComponent);
    const {name, reviewCount, price, category} = MOCK_PRODUCT;

    const nameMatcher: MatcherFunction = (_, element) => {
      if (!element) {
        return false;
      }

      const hasText = (node: Node): boolean => node.textContent === `${category} ${name}`;
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    };

    const priceElement = screen.getByTestId('product-price');
    const formattedPrice = price.toLocaleString().replace(/\s/g, '\\s');

    expect(screen.getByText(nameMatcher)).toBeInTheDocument();
    expect(screen.getByAltText(name)).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(new RegExp(`Цена:\\s?${formattedPrice} ₽`));
    expect(screen.getByText(reviewCount)).toBeInTheDocument();

  });

  it('calls onProductClick when "Купить" button is clicked', () => {
    const handleProductClick = vi.fn();

    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ProductCard
        product={MOCK_PRODUCT}
        onProductClick={handleProductClick}
      />
    );

    render(wrappedComponent);

    const buyButton = screen.getByRole('button', { name: /Купить/i });
    buyButton.click();

    expect(handleProductClick).toHaveBeenCalledWith('CatalogCallModal', MOCK_PRODUCT);
  });

  it('renders "Подробнее" link with correct URL', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ProductCard
        product={MOCK_PRODUCT}
        onProductClick={vi.fn()}
      />
    );

    render(wrappedComponent);

    const detailsLink = screen.getByRole('link', { name: /Подробнее/i });
    expect(detailsLink).toHaveAttribute('href', `/product/${MOCK_PRODUCT.id}`);
  });

});
