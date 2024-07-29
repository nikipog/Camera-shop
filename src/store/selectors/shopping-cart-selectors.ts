import { RootState } from '../../types/store';

export const selectAddedProducts = (state: RootState) => state['shopping-cart'].addedProducts;
export const selectTotalPrice = (state: RootState) => state['shopping-cart'].totalPrice;
export const selectTotalQuantity = (state: RootState) => state['shopping-cart'].totalQuantity;
export const selectDiscountPercent = (state: RootState) => state['shopping-cart'].discountPercent;
export const selectTotalPriceWithDiscount = (state: RootState) => state['shopping-cart'].totalPriceWithDiscount;
