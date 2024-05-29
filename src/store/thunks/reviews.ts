import { AxiosInstance } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product } from '../../types/product';
import type { Review } from '../../types/reviews';

import { Endpoint } from '../../const';

//запрос к серверу на получение комментариев

const fetchReviews = createAsyncThunk<Review[], Product['id'], { extra: AxiosInstance }>
('reviews/fetch', async (productID, {extra : api}) => {
  const response = await api.get<Review[]>(`${Endpoint.Cameras}/${productID}/reviews`);
  return response.data;
});


export { fetchReviews };
