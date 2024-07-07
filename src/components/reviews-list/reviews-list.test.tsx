import { render, screen, fireEvent } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { withMemoryAndStoreWrapper } from '../../utils/mock-component';
import { mockReviews } from '../../utils/mocks';


describe('ReviewsList', () => {
  it('renders correctly with reviews', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ReviewsList reviews={mockReviews} />
    );

    render(wrappedComponent);

    const visibleReviews = mockReviews.slice(0, 3);
    visibleReviews.forEach((review) => {
      expect(screen.getAllByText(review.review)).toHaveLength(1);
    });

    expect(screen.getByRole('button', { name: /показать больше отзывов/i })).toBeInTheDocument();
  });

  it('renders correctly without reviews', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ReviewsList reviews={[]} />
    );

    render(wrappedComponent);

    // Отладочная информация
    screen.debug();

    expect(screen.getByText('К данному товару нет оставленных отзывов')).toBeInTheDocument();
  });

  it('handles show more reviews button click', () => {
    const { wrappedComponent } = withMemoryAndStoreWrapper(
      <ReviewsList reviews={mockReviews} />
    );

    render(wrappedComponent);

    fireEvent.click(screen.getByRole('button', { name: /показать больше отзывов/i }));

    mockReviews.slice(0, 6).forEach((review) => {
      expect(screen.getAllByText(review.review)).toHaveLength(1);
    });
  });
});
