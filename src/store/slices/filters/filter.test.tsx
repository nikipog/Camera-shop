import { filterSlice, resetCategory, resetFilters, setCategory, setPriceInputValues, setPriceRange, toggleLevel, toggleType } from './filter';

describe('Filter Slice', () => {
  const getState = (overrides = {}) => ({
    category: 'Фотокамера',
    type: ['Коллекционная'],
    level: ['Нулевой'],
    priceRange: { min: 100, max: 200 },
    priceInputValues: { minPriceInputValue: 100, maxPriceInputValue: 200 },
    ...overrides,
  });

  const getInitialState = () => ({
    category: null,
    type: [],
    level: [],
    priceRange: { min: null, max: null },
    priceInputValues: { minPriceInputValue: null, maxPriceInputValue: null },
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = filterSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = filterSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should reset filters with "resetFilters" action', () => {
    const initialState = getState();
    const expectedState = getInitialState();
    const result = filterSlice.reducer(initialState, resetFilters);
    expect(result).toEqual(expectedState);
  });

  it('should reset category with "resetCategory" action', () => {
    const initialState = getState();
    const expectedState = getState({ category: null });
    const result = filterSlice.reducer(initialState, resetCategory);
    expect(result).toEqual(expectedState);
  });

  it('should set new price input values category with "setPriceInputValues" action', () => {
    const state = getState();
    const expectedState = getState({ priceInputValues: { minPriceInputValue: 10000, maxPriceInputValue: 20000 } });
    const result = filterSlice.reducer(state, setPriceInputValues({ minPriceInputValue: 10000, maxPriceInputValue: 20000 }));
    expect(result).toEqual(expectedState);
  });

  it('should set new price range with "setPriceRange" action', () => {
    const state = getState();
    const expectedState = getState({ priceRange: { min: 10000, max: 20000 } });
    const result = filterSlice.reducer(state, setPriceRange({ min: 10000, max: 20000 }));
    expect(result).toEqual(expectedState);
  });

  it('should set new category with "setCategory" action', () => {
    const state = getState();
    const expectedState = getState({ category: 'Видеокамера' });
    const result = filterSlice.reducer(state, setCategory('Видеокамера'));
    expect(result).toEqual(expectedState);
  });

  it('should remove type with "toggleType" action if type exists', () => {
    const state = getState();
    const expectedState = getState({ type: [] });
    const result = filterSlice.reducer(state, toggleType('Коллекционная'));
    expect(result).toEqual(expectedState);
  });

  it('should add type with "toggleType" action if type does not exists', () => {
    const state = getState({ type: [] });
    const expectedState = getState();
    const result = filterSlice.reducer(state, toggleType('Коллекционная'));
    expect(result).toEqual(expectedState);
  });

  it('should remove level with "toggleLevel" action if level exists', () => {
    const state = getState();
    const expectedState = getState({ level: [] });
    const result = filterSlice.reducer(state, toggleLevel('Нулевой'));
    expect(result).toEqual(expectedState);
  });

  it('should add level with "toggleLevel" action if level does not exists', () => {
    const state = getState({ level: [] });
    const expectedState = getState();
    const result = filterSlice.reducer(state, toggleLevel('Нулевой'));
    expect(result).toEqual(expectedState);
  });
});
