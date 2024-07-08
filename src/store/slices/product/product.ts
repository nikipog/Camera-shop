import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../const';

import { Product } from '../../../types/product';
import { fetchProduct } from '../../thunks/products/products';

interface ProductState {
  product: Product | null;
  status: RequestStatus;
}

//начальное состояние
const initialState: ProductState = {
  // храним объект продукта, важно указывать null вместо пустого объекта!
  product: null,
  //состояние
  status: RequestStatus.Idle
};

//в экстра-редьюсере обрабатываем асинхронные экшены на получение квеста

export const productSlice = createSlice({
  extraReducers: (builder) => {
    // в случае успеха получения продукта:
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      // обновляем поле продукт
      state.product = action.payload;
      state.status = RequestStatus.Success;
    });
    //если не получили - указываем статус
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    // если загружается - указываем статус
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'product',
  reducers: {
    clear(state) {
      state.product = null;
    }
  },
});

export const productActions = {...productSlice.actions, fetchProduct}; //асинхронные экшены на получение квеста
export default productSlice.reducer;

