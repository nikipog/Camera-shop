import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/store';


const localStorageMiddleware: Middleware = ({ getState }) => (next) => (action: PayloadAction<string>) => {
  const result = next(action);
  const state = getState() as RootState;
  if (action.type.startsWith('shopping-cart/')) {
    localStorage.setItem('shoppingCart', JSON.stringify(state['shopping-cart']));
  }
  return result;
};

export default localStorageMiddleware;
