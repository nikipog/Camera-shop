import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { formatReviewDate } from '../../utils/utils';
import { MOCK_REVIEW } from '../../utils/mocks';
import { MAX_RATING_COUNT } from '../../const';


describe('ReviewItem', () => {
  it('renders review info correctly', () => {
    render(<ReviewItem review={MOCK_REVIEW} />);

    expect(screen.getByText(formatReviewDate(MOCK_REVIEW.createAt))).toBeInTheDocument();
    expect(screen.getByText(MOCK_REVIEW.userName)).toBeInTheDocument();
    expect(screen.getByText(MOCK_REVIEW.advantage)).toBeInTheDocument();
    expect(screen.getByText(MOCK_REVIEW.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(MOCK_REVIEW.review)).toBeInTheDocument();
  });

  it('renders correct number of full and empty stars', () => {
    render(<ReviewItem review={MOCK_REVIEW} />);

    const fullStars = screen.getAllByTestId('full-star');
    const emptyStars = screen.getAllByTestId('empty-star');

    expect(fullStars.length).toBe(MOCK_REVIEW.rating);
    expect(emptyStars.length).toBe(MAX_RATING_COUNT - MOCK_REVIEW.rating);
  });

  it('renders correct dateTime attribute', () => {
    render(<ReviewItem review={MOCK_REVIEW} />);

    const dateTimeElement = screen.getByText(formatReviewDate(MOCK_REVIEW.createAt)).closest('time');
    expect(dateTimeElement).toHaveAttribute('dateTime', MOCK_REVIEW.createAt);
  });
});

