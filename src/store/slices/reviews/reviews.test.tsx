import { RequestStatus } from '../../../const';
import { MOCK_REVIEW } from '../../../utils/mocks';
import { fetchReviews } from '../../thunks/reviews/reviews';
import { reviewsSlice } from './reviews';


describe('Reviews Slice', () => {
  const getState = (overrides = {}) => ({
    reviews: [MOCK_REVIEW],
    status: RequestStatus.Success,
    ...overrides,
  });

  const getInitialState = () => ({
    reviews: [],
    status: RequestStatus.Idle
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = reviewsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = reviewsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should set request status "success" with "fetchReviews.fulfilled" action and add reviews', () => {
    const expectedState = getState();
    const result = reviewsSlice.reducer(undefined, fetchReviews.fulfilled([MOCK_REVIEW], 'reviews/fetch', 1));
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Loading" with "fetchReviews.Loading" action', () => {
    const expectedState = getState({status: RequestStatus.Loading, reviews: []});
    const result = reviewsSlice.reducer(undefined, fetchReviews.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Failed" with "fetchReviews.rejected" action', () => {
    const expectedState = getState({status: RequestStatus.Failed, reviews: []});
    const result = reviewsSlice.reducer(undefined, fetchReviews.rejected);
    expect(result).toEqual(expectedState);
  });
});
