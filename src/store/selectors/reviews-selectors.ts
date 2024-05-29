import { RequestStatus } from '../../const';
import { Review } from '../../types/reviews';

interface ReviewsState {
  reviews: Review[];
  status: RequestStatus;
}


export const selectReviews = (state: {reviews: ReviewsState }) => state.reviews.reviews;
export const selectReviewsState = (state: {reviews: ReviewsState }) => state.reviews.status;
