import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';

interface OrderState {
  addedProducts: Product[];
  totalPrice: number;
  totalQuantity: number;
}
interface QuantityAction {
  id: number;
  newQuantity: number;
}

const loadStateFromLocalStorage = (): OrderState => {
  const defaultState: OrderState = {
    addedProducts: [],
    totalPrice: 0,
    totalQuantity: 0,
  };

  try {
    const serializedState = localStorage.getItem('shoppingCart');
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState) as OrderState;
  } catch {
    return defaultState;
  }
};

const initialState: OrderState = loadStateFromLocalStorage();


export const shoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {

      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);

      if (findAddedProducts && findAddedProducts.quantity) {
        if (findAddedProducts.quantity < 9) {

          findAddedProducts.quantity++;
        }
      } else {
        state.addedProducts.push({
          ...action.payload,
          quantity: 1
        });
      }
      shoppingCartSlice.caseReducers.updateTotals(state);
    },

    decrementProductQuantity(state, action: PayloadAction<Product>) {
      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);

      if (findAddedProducts && findAddedProducts.quantity && findAddedProducts.quantity > 1) {
        findAddedProducts.quantity--;
      }
      shoppingCartSlice.caseReducers.updateTotals(state);
    },

    setProductQuantity(state, action: PayloadAction<QuantityAction>) {
      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);
      if (findAddedProducts && findAddedProducts.quantity) {
        findAddedProducts.quantity = action.payload.newQuantity;
      }
      shoppingCartSlice.caseReducers.updateTotals(state);
    },

    removeProduct(state, action: PayloadAction<Product>) {
      state.addedProducts = state.addedProducts.filter((item) => item.id !== action.payload.id);
      shoppingCartSlice.caseReducers.updateTotals(state);
    },
    updateTotals(state: OrderState) {
      state.totalQuantity = state.addedProducts.reduce((sum, product) => sum + (product.quantity || 0), 0);
      state.totalPrice = state.addedProducts.reduce((sum, obj) => obj.price * (obj.quantity || 0) + sum, 0);
    }
  }
});

export const { addProduct, removeProduct, decrementProductQuantity, setProductQuantity } = shoppingCartSlice.actions;


export default shoppingCartSlice.reducer;
