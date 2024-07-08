import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../const';
import { Product } from '../../../types/product';
import { fetchAllProducts } from '../../thunks/products/products';


interface ProductsState {
  products: Product[];
  status: RequestStatus;
}

export const initialState: ProductsState = {
  products: [],
  status: RequestStatus.Idle
};
const productsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'products',
  reducers: {}
});

const productsActions = {...productsSlice.actions, fetchAllProducts};

export { productsActions , productsSlice };
export default productsSlice.reducer;


