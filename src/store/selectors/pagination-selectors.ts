import { RootState } from '../../types/store';

export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectMaxProductsPerPage = (state: RootState) => state.pagination.maxProductsPerPage;
export const selectTotalPages = (state: RootState) => state.pagination.totalPages;
