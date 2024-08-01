import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../const';
import { ordersThunk } from '../../thunks/order/order';
import { AllowedCoupons } from '../../../types/order';

interface OrderState {
  camerasIds: number[];
  coupon: AllowedCoupons;
  status: RequestStatus;
}

const initialState: OrderState = {
  camerasIds: [],
  coupon: null,
  status: RequestStatus.Idle,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCamerasIds(state, action: PayloadAction<number[]>) {
      state.camerasIds = action.payload;
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

export const { setCamerasIds } = orderSlice.actions;

export const orderActions = {
  ...orderSlice.actions,
  ...ordersThunk,
};

export default orderSlice.reducer;
