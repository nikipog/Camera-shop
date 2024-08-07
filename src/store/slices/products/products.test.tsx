import { RequestStatus } from '../../../const';
import { MOCK_PRODUCT } from '../../../utils/mocks';
import { fetchAllProducts } from '../../thunks/products/products';
import { productsSlice } from './products';


describe('Products Slice', () => {
  const getState = (overrides = {}) => ({
    products: [MOCK_PRODUCT],
    status: RequestStatus.Success,
    ...overrides,
  });

  const getInitialState = () => ({
    products: [],
    status: RequestStatus.Idle
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = productsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = productsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should set request status "success" with "fetchProducts.fulfilled" action and add products', () => {
    const expectedState = getState();
    const result = productsSlice.reducer(undefined, fetchAllProducts.fulfilled([MOCK_PRODUCT], 'fetchProducts/all', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Loading" with "fetchProducts.Loading" action', () => {
    const expectedState = getState({status: RequestStatus.Loading, products: []});
    const result = productsSlice.reducer(undefined, fetchAllProducts.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set request status "Failed" with "fetchProducts.rejected" action', () => {
    const expectedState = getState({status: RequestStatus.Failed, products: []});
    const result = productsSlice.reducer(undefined, fetchAllProducts.rejected);
    expect(result).toEqual(expectedState);
  });
});
