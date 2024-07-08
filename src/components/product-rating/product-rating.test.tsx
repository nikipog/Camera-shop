import { render, screen } from '@testing-library/react';
import ProductRating from './product-rating';
import { MAX_RATING_COUNT } from '../../const';


describe('ProductRating', () => {
  it('renders correct number of full and empty stars', () => {
    const rating = 4;
    render(<ProductRating rating={rating} />);

    const fullStars = screen.getAllByTestId('full-star');
    const emptyStars = screen.getAllByTestId('empty-star');

    expect(fullStars.length).toBe(rating);
    expect(emptyStars.length).toBe(MAX_RATING_COUNT - rating);
  });
  it('renders correct number of empty stars when rating is 0', () => {
    const rating = 0;
    render(<ProductRating rating={rating} />);

    const fullStars = screen.queryAllByTestId('full-star');
    const emptyStars = screen.getAllByTestId('empty-star');

    expect(fullStars.length).toBe(rating);
    expect(emptyStars.length).toBe(MAX_RATING_COUNT);
  });

  it('renders correct number of full stars when rating is maximum', () => {
    const rating = MAX_RATING_COUNT;
    render(<ProductRating rating={rating} />);

    const fullStars = screen.getAllByTestId('full-star');
    const emptyStars = screen.queryAllByTestId('empty-star');

    expect(fullStars.length).toBe(rating);
    expect(emptyStars.length).toBe(0);
  });

});
