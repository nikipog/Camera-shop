import { useContext } from 'react';
import { SelectedProductContext } from '../context/selected-product-context';

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error('useSelectedProduct must be used within a SelectedProductProvider');
  }
  return context;
};
