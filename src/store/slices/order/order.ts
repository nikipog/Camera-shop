import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../const';
import { ordersThunk } from '../../thunks/order/order';

interface OrderState {
  camerasIds: number[];
  tel: string;
  status: RequestStatus;
}

const initialState: OrderState = {
  camerasIds: [],
  tel: '',
  status: RequestStatus.Idle,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCamerasIds(state, action: PayloadAction<number[]>) {
      state.camerasIds = action.payload;
    },
    setTel(state, action: PayloadAction<string>) {
      state.tel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersThunk.postOrder.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(ordersThunk.postOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(ordersThunk.postOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  },
});

export const { setCamerasIds, setTel } = orderSlice.actions;

export const orderActions = {
  ...orderSlice.actions,
  ...ordersThunk,
};

export default orderSlice.reducer;
