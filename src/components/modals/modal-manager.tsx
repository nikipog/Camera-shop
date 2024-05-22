import { FC } from 'react';
import { useModalContext } from '../../hooks/modal-context';
import CatalogCallModal from './catalog-modals/catalog-call-modal';

const ModalLookup: Record<string, FC | undefined> = {
  CatalogCallModal,
};

const ModalManager: FC = () => {
  const { modal } = useModalContext();

  if (!modal) {
    return null;
  }
  const ModalComponent = ModalLookup[modal as string];
  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent />;
};

export default ModalManager;
