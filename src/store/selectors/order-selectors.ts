import { RequestStatus } from '../../const';

interface OrderState {
  camerasIds: number[];
  tel: string;
  status: RequestStatus;
}

export const selectCamerasIds = (state: { orders: OrderState }) => state.orders.camerasIds;
export const selectTel = (state: { orders: OrderState }) => state.orders.tel;
export const selectOrderStatus = (state: { orders: OrderState }) => state.orders.status;
