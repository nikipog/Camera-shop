import { FC } from 'react';
import { useModal } from '../../hooks/context';
import CatalogCallModal from './catalog-modals/catalog-call-modal';

const ModalLookup: Record<string, FC | undefined> = {
  CatalogCallModal,
};

const ModalManager: FC = () => {
  const { modal } = useModal();

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
