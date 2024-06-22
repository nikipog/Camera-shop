import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string | null;
  type: string[];
  level: string[];
  priceRange: { min: number; max: number };
}

const initialState: FilterState = {
  category: null,
  type: [],
  level: [],
  priceRange: { min: 0, max: 100000000 },
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
    resetFilters(state) {
      state.category = null;
      state.type = [];
      state.level = [];
      state.priceRange = { min: 0, max: 0 };
    }
  },
});

export const { setCategory, toggleType, toggleLevel, setPriceRange, resetFilters } = filterSlice.actions;
export {filterSlice};
export default filterSlice.reducer;
