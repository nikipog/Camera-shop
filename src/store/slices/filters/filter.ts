import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string | null;
  type: string[];
  level: string[];
  priceRange: { min: number | null; max: number | null };
  priceInputValues: { minPriceInputValue: number | null; maxPriceInputValue: number | null };
}

const initialState: FilterState = {
  category: null,
  type: [],
  level: [],
  priceRange: { min: null, max: null },
  priceInputValues: { minPriceInputValue: null, maxPriceInputValue: null },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    toggleType(state, action: PayloadAction<string>) {
      if (state.type.includes(action.payload)) {
        state.type = state.type.filter((type) => type !== action.payload);
      } else {
        state.type.push(action.payload);
      }
    },
    toggleLevel(state, action: PayloadAction<string>) {
      if (state.level.includes(action.payload)) {
        state.level = state.level.filter((level) => level !== action.payload);
      } else {
        state.level.push(action.payload);
      }
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
    },
    setPriceInputValues(state, action: PayloadAction<{ minPriceInputValue: number | null; maxPriceInputValue: number | null }>) {
      state.priceInputValues = action.payload;
    },
    resetCategory(state) {
      state.category = null;
    },
    resetFilters(state) {
      state.category = null;
      state.type = [];
      state.level = [];
      state.priceRange = { min: null, max: null };
      state.priceInputValues = { minPriceInputValue: null, maxPriceInputValue: null };
    }
  },
});

export const { setCategory, toggleType, toggleLevel, setPriceRange, resetFilters, setPriceInputValues, resetCategory } = filterSlice.actions;
export {filterSlice};
export default filterSlice.reducer;
