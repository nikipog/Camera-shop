import { FC } from 'react';
import { useModalContext } from '../../hooks/modal-context';
import CatalogCallModal from './catalog-modals/catalog-call-modal';
import CatalogAddSuccessModal from './catalog-modals/catalog-add-success-modal/catalog-add-success-modal';
import CatalogAddModal from './catalog-modals/catalog-add-modal/catalog-add-modal';

const ModalLookup: Record<string, FC | undefined> = {
  CatalogCallModal,
  CatalogAddModal,
  CatalogAddSuccessModal,
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
