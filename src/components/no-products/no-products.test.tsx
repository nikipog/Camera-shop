import {render, screen } from '@testing-library/react';
import NoProducts from './no-products';

describe('Component: No Products', () => {
  it ('should render correctly', () => {
    const expectedText = /Товары не найдены/i;

    render(<NoProducts/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
