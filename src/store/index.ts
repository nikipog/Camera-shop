import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { productsSlice } from './slices/products/products';
import { orderSlice } from './slices/order/order';
import { productSlice } from './slices/product/product';
import { reviewsSlice } from './slices/reviews/reviews';
import { filterSlice } from './slices/filters/filter';
import { sortSlice } from './slices/sort/sort';
import { paginationSlice } from './slices/pagination/pagination';
import { shoppingCartSlice } from './slices/shopping-cart/shopping-cart';
import localStorageMiddleware from './middlewares/local-storage-middleware/local-storage-middleware';


const reducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [sortSlice.name]: sortSlice.reducer,
  [paginationSlice.name]: paginationSlice.reducer,
  [shoppingCartSlice.name]: shoppingCartSlice.reducer
});


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument:
          createApi()
      }
    }).concat(localStorageMiddleware),
  reducer,
});
