import { RootState } from '../../types/store';

// Селектор для получения продукта
export const selectProduct = (state: RootState) => state.product.product;

// Селектор для получения статуса запроса продукта
export const selectProductStatus = (state: RootState) => state.product.status;
