import { memo } from 'react';
import NoReviews from '../no-reviews/no-reviews';
import { Review } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];

}

const ReviewsList = memo(({ reviews }: ReviewsListProps): JSX.Element => (
  <ul className="review-block__list">
    {(!reviews) ? <NoReviews /> :
      reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
  </ul>
));


ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
