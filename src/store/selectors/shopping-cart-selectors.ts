import { RootState } from '../../types/store';

export const selectAddedProducts = (state: RootState) => state['shopping-cart'].addedProducts;
export const selectTotalQuantity = (state: RootState) => state['shopping-cart'].totalQuantity;
