import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { productsSlice } from './slices/products/products';
import { orderSlice } from './slices/order/order';
import { productSlice } from './slices/product/product';
import { reviewsSlice } from './slices/reviews/reviews';


const reducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer

});


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument:
          createApi()
      }
    }),
  reducer,
});
