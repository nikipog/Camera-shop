import { RootState } from '../../types/store';

export const selectFilters = (state: RootState) => state.filters;

export const selectPriceInputValues = (state: RootState) => state.filters.priceInputValues;
