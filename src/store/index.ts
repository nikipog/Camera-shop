import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { productsSlice } from './slices/products';
import { orderSlice } from './slices/order';


const reducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer

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
