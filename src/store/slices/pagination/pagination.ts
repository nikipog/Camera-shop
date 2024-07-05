import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface PaginationState {
  currentPage: number;
  maxProductsPerPage: number;
  totalPages: number | null;
}

const initialState: PaginationState = {
  currentPage: 1,
  maxProductsPerPage: 9,
  totalPages: null,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    }
  },
});

export const { setCurrentPage, setTotalPages } = paginationSlice.actions;
export { paginationSlice };
export default paginationSlice.reducer;
