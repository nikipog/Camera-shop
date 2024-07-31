import { RootState } from '../../types/store';


export const selectCamerasIds = (state: RootState) => state.orders.camerasIds;
export const selectOrderStatus = (state: RootState) => state.orders.status;
