import {render, screen } from '@testing-library/react';
import NoReviews from './no-reviews';

describe('Component: No Products', () => {
  it ('should render correctly', () => {
    const expectedText = /К данному товару нет оставленных отзывов/i;

    render(<NoReviews/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
