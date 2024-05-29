import { createContext, useState, ReactNode, Context, useCallback } from 'react';

export interface ModalContextType {
  modal: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext: Context<ModalContextType | null> = createContext<ModalContextType | null>(null);


interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = useCallback((content: ReactNode) => {
    setModal(content);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};


