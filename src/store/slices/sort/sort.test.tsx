// store/slices/sort/sort.test.ts
import { sortSlice, setSortType, setSortOrder, resetSort } from './sort';
import { sortType, sortOrder } from '../../../types/sort';

// Определяем начальное состояние для тестов
const getState = (overrides = {}) => ({
  sortType: 'sortPrice' as sortType,
  sortOrder: 'up' as sortOrder,
  ...overrides,
});

const getInitialState = () => ({
  sortType: 'sortPrice' as sortType,
  sortOrder: 'up' as sortOrder,
});

describe('Sort Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = sortSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = sortSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set sort type with "setSortType" action', () => {
    const state = getState();
    const expectedState = getState({ sortType: 'sortRating' });
    const result = sortSlice.reducer(state, setSortType('sortRating' as sortType));
    expect(result).toEqual(expectedState);
  });

  it('should set sort order with "setSortOrder" action', () => {
    const state = getState();
    const expectedState = getState({ sortOrder: 'down' });
    const result = sortSlice.reducer(state, setSortOrder('down' as sortOrder));
    expect(result).toEqual(expectedState);
  });

  it('should reset sort with "resetSort" action', () => {
    const state = getState({ sortType: 'sortRating', sortOrder: 'down' });
    const expectedState = getInitialState();
    const result = sortSlice.reducer(state, resetSort());
    expect(result).toEqual(expectedState);
  });
});
