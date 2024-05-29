import { createSlice } from '@reduxjs/toolkit';

import type { Review } from '../../types/reviews';

import { RequestStatus } from '../../const';
import { fetchReviews } from '../thunks/reviews';

interface ReviewState {
  reviews: Review[];
  status: RequestStatus;
}

const initialState: ReviewState = {
  reviews: [],
  status: RequestStatus.Idle
};

export const reviewsSlice = createSlice({
  extraReducers: (builder) => {
    // с помощтю fetchComments можно получить список всех комментариев
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchReviews.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchReviews.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'reviews',
  reducers: {},

});

export const reviewActions = {
  ...reviewsSlice.actions,
  fetchReviews
};

