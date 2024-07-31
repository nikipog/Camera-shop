import { FC } from 'react';
import { useModalContext } from '../../hooks/modal-context';
import CatalogAddSuccessModal from './catalog-modals/catalog-add-success-modal/catalog-add-success-modal';
import CatalogAddModal from './catalog-modals/catalog-add-modal/catalog-add-modal';
import CartRemoveItemModal from './cart-modals/cart-remove-item-modal/cart-remove-item-modal';
import CartSuccessOrderModal from './cart-modals/cart-succes-order-modal/cart-success-order-modal';
import CartFailureOrderModal from './cart-modals/cart-failure-order-modal/cart-failure-order-modal';

const ModalLookup: Record<string, FC | undefined> = {
  CatalogAddModal,
  CatalogAddSuccessModal,
  CartRemoveItemModal,
  CartSuccessOrderModal,
  CartFailureOrderModal
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
