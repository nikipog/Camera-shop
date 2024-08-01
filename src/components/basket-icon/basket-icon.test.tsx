
import { render, screen } from '@testing-library/react';
import BasketIcon from './basket-icon';

import { State } from '../../types/state';
import { AppRoute } from '../../const';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';
import { MOCK_PRODUCT } from '../../utils/mocks';

describe('Component: BasketIcon', () => {
  it('should render correctly with products in the basket', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [MOCK_PRODUCT],
        totalQuantity: 2,
        totalPrice: 70000,
        discountPercent: 0,
        totalPriceWithDiscount: 70000
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<BasketIcon />, initialState);

    render(wrappedComponent);

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Cart);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render correctly with empty basket', () => {
    const emptyState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [],
        totalQuantity: 0,
        totalPrice: 0,
        discountPercent: 0,
        totalPriceWithDiscount: 0
      },
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<BasketIcon />, emptyState);

    render(wrappedComponent);

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Cart);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
