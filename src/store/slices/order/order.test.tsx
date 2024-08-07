import { RequestStatus } from '../../../const';
import { ordersThunk } from '../../thunks/order/order';
import { orderSlice, setCamerasIds } from './order';


describe('Order Slice', () => {
  const getState = (overrides = {}) => ({
    camerasIds: [1, 2],
    coupon: null,
    status: RequestStatus.Success,
    ...overrides,
  });

  const getInitialState = () => ({
    camerasIds: [],
    coupon: null,
    status: RequestStatus.Idle,
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = orderSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = orderSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set camera id with "setCamerasIds" action', () => {
    const state = getState();
    const expectedState = getState({ camerasIds: [1, 2, 3] });
    const result = orderSlice.reducer(state, setCamerasIds([1, 2, 3]));
    expect(result).toEqual(expectedState);
  });

  it('should set request status "success" with "postOrder.fulfilled" action', () => {
    const state = getInitialState();
    const action = { type: ordersThunk.postOrder.fulfilled.type };
    const expectedState = { ...state, status: RequestStatus.Success };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual(expectedState);
  });

  it('should set request status "failed" with "postOrder.rejected" action', () => {
    const state = getInitialState();
    const action = { type: ordersThunk.postOrder.rejected.type };
    const expectedState = { ...state, status: RequestStatus.Failed };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual(expectedState);
  });

  it('should set request status "loading" with "postOrder.pending" action', () => {
    const state = getInitialState();
    const action = { type: ordersThunk.postOrder.pending.type };
    const expectedState = { ...state, status: RequestStatus.Loading };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual(expectedState);
  });

});
