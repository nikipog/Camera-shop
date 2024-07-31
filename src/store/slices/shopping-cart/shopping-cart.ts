import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';
import { adjustDiscountByTotalPrice, getDiscountByQuantity } from '../../../utils/utils';
import { ArrayMethodParameter, PERCENT_TOTAL, ProductQuantityDiscountRange } from '../../../const';

interface ShoppingCartState {
  addedProducts: Product[];
  totalPrice: number;
  totalQuantity: number;
  discountPercent: number;
  totalPriceWithDiscount: number;
}
interface QuantityAction {
  id: number;
  newQuantity: number;
}

const loadStateFromLocalStorage = (): ShoppingCartState => {
  const defaultState: ShoppingCartState = {
    addedProducts: [],
    totalPrice: 0,
    totalQuantity: 0,
    discountPercent: 0,
    totalPriceWithDiscount: 0,
  };

  try {
    const serializedState = localStorage.getItem('shoppingCart');
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState) as ShoppingCartState;
  } catch {
    return defaultState;
  }
};

const initialState: ShoppingCartState = loadStateFromLocalStorage();

export const ProductAmount = {
  NoProducts: 0,
  OneProduct: 1,
  MaxProductAmount: 9,
} as const;


export const shoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {

      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);

      if (findAddedProducts && findAddedProducts.quantity) {
        if (findAddedProducts.quantity < ProductAmount.MaxProductAmount) {

          findAddedProducts.quantity++;
        }
      } else {
        state.addedProducts.push({
          ...action.payload,
          quantity: ProductAmount.OneProduct
        });
      }
      shoppingCartSlice.caseReducers.updateTotals(state);
    },

    decrementProductQuantity(state, action: PayloadAction<Product>) {
      const findAddedProducts = state.addedProducts.find((product) => product.id === action.payload.id);

      if (findAddedProducts && findAddedProducts.quantity && findAddedProducts.quantity > ProductAmount.OneProduct) {
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
    clearCart(state) {
      state.addedProducts.splice(ArrayMethodParameter.RemoveFromZeroIndex, state.addedProducts.length);
      shoppingCartSlice.caseReducers.updateTotals(state);
    },
    updateTotals(state: ShoppingCartState) {
      state.totalQuantity = state.addedProducts.reduce((sum, product) => sum + (product.quantity || ProductAmount.NoProducts), ArrayMethodParameter.StartAccumulationFromZero);
      state.totalPrice = state.addedProducts.reduce((sum, obj) => obj.price * (obj.quantity || ProductAmount.NoProducts) + sum, ArrayMethodParameter.StartAccumulationFromZero);

      let discountPercent = getDiscountByQuantity(state.totalQuantity);
      if (state.totalQuantity > ProductQuantityDiscountRange.OneProduct) {
        discountPercent = adjustDiscountByTotalPrice(state.totalPrice, discountPercent);
      }

      state.discountPercent = discountPercent;
      state.totalPriceWithDiscount = Math.round(state.totalPrice - (state.totalPrice / PERCENT_TOTAL * state.discountPercent));
    }

  }
});

export const { addProduct, removeProduct, decrementProductQuantity, setProductQuantity, clearCart } = shoppingCartSlice.actions;


export default shoppingCartSlice.reducer;
