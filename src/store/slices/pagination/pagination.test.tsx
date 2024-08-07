import { paginationSlice, setCurrentPage, setTotalPages } from './pagination';


describe('Pagination Slice', () => {
  const getState = (overrides = {}) => ({
    currentPage: 2,
    maxProductsPerPage: 9,
    totalPages: 9,
    ...overrides,
  });

  const getInitialState = () => ({
    currentPage: 1,
    maxProductsPerPage: 9,
    totalPages: null,
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = paginationSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = paginationSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set current page with "setCurrentPage" action', () => {
    const state = getState();
    const expectedState = getState({ currentPage: 3 });
    const result = paginationSlice.reducer(state, setCurrentPage(3));
    expect(result).toEqual(expectedState);
  });

  it('should set total pages with "setTotalPages" action', () => {
    const state = getState();
    const expectedState = getState({ totalPages: 3 });
    const result = paginationSlice.reducer(state, setTotalPages(3));
    expect(result).toEqual(expectedState);
  });

});
