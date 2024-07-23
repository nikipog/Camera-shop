import { RootState } from '../../types/store';

export const selectAddedProducts = (state: RootState) => state['shopping-cart'].addedProducts;
