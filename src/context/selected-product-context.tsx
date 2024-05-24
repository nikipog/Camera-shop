import { createContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';

type SelectedProductContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

export const SelectedProductContext = createContext<SelectedProductContextType | undefined>(undefined);

export const SelectedProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <SelectedProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </SelectedProductContext.Provider>
  );
};


