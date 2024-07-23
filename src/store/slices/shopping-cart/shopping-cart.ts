import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';


interface OrderState {
  addedProducts: Product[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: OrderState = {
  addedProducts: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const shoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {

      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);

      if (findAddedProducts && findAddedProducts.quantity) {
        findAddedProducts.quantity++;
      } else {
        state.addedProducts.push({
          ...action.payload,
          quantity: 1

        });



      }
      state.totalPrice = state.addedProducts.reduce((sum, obj) => obj.price * (obj.quantity || 0) + sum, 0);
      state.totalQuantity = state.addedProducts.reduce((sum, product) => sum + (product.quantity || 0), 0);

    },
    removeProduct (state, action: PayloadAction<Product>) {
      state.addedProducts = state.addedProducts.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const { addProduct, removeProduct } = shoppingCartSlice.actions;


export default shoppingCartSlice.reducer;
