import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortOrder, sortType } from '../../../types/sort';

interface SortState {
  sortType: sortType;
  sortOrder: sortOrder;
}

const initialState: SortState = {
  sortType: 'sortPrice',
  sortOrder: 'up'
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<sortType>) {
      state.sortType = action.payload;
    },
    setSortOrder(state, action: PayloadAction<sortOrder>) {
      state.sortOrder = action.payload;
    },
    resetSort(state) {
      state.sortType = initialState.sortType;
      state.sortOrder = initialState.sortOrder;
    }
  },
});

export const { setSortType, setSortOrder, resetSort } = sortSlice.actions;
export { sortSlice };
export default sortSlice.reducer;
