import { RequestStatus } from '../../../const';
import { MOCK_PRODUCT } from '../../../utils/mocks';
import { fetchProduct } from '../../thunks/products/products';
import { productSlice } from './product';


describe('Product Slice', () => {
  const getState = (overrides = {}) => ({
    product: MOCK_PRODUCT,
    status: RequestStatus.Success,
    ...overrides,
  });

  const getInitialState = () => ({
    product: null,
    status: RequestStatus.Idle
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = productSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = productSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should set request status "success" with "fetchProduct.fulfilled" action and add product', () => {
    const expectedState = getState();
    const result = productSlice.reducer(undefined, fetchProduct.fulfilled(MOCK_PRODUCT, 'fetchProducts/one', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Loading" with "fetchProduct.Loading" action', () => {
    const expectedState = getState({status: RequestStatus.Loading, product: null});
    const result = productSlice.reducer(undefined, fetchProduct.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Failed" with "fetchProduct.rejected" action', () => {
    const expectedState = getState({status: RequestStatus.Failed, product: null});
    const result = productSlice.reducer(undefined, fetchProduct.rejected);
    expect(result).toEqual(expectedState);
  });
});
