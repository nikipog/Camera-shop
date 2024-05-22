import React, { useContext } from 'react';
import { ModalContext, ModalContextType } from '../context/modal-context';

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext as React.Context<ModalContextType>);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

