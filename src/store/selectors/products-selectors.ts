import { RootState } from '../../types/store';

// Селектор для получения всех продуктов
export const selectProducts = (state: RootState) => state.products.products;

// Селектор для получения статуса запроса продуктов
export const selectProductsStatus = (state: RootState) => state.products.status;
