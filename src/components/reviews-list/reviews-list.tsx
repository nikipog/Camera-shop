import { memo, useState } from 'react';
import NoReviews from '../no-reviews/no-reviews';
import { Review } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

const MAX_VISIBLE_REVIEWS_COUNT = 3;
const NO_REVIEWS_COUNT = 0;
const INITIAL_SLICE_INDEX = 0;

const ReviewsList = memo(({ reviews }: ReviewsListProps): JSX.Element => {
  const [visibleReviews, setVisibleReviews] = useState(MAX_VISIBLE_REVIEWS_COUNT);

  const handleShowMoreReviewsButtonClick = () => {
    setVisibleReviews((prev) => Math.min(prev + MAX_VISIBLE_REVIEWS_COUNT, reviews.length)); // При клике передается предыдущее значение, суммируется с максимальным и возвращается минимальное значение из двух.
  };

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());


  return (
    <>
      <ul className="review-block__list">
        {(!reviews || reviews.length === NO_REVIEWS_COUNT) ? <NoReviews /> :
          sortedReviews.slice(INITIAL_SLICE_INDEX, visibleReviews)
            .map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
              />
            ))}
      </ul>
      {visibleReviews < reviews.length && (
        <div className="review-block__buttons">
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleShowMoreReviewsButtonClick}
          >
            Показать больше отзывов
          </button>
        </div>)}
    </>
  );
});


ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
