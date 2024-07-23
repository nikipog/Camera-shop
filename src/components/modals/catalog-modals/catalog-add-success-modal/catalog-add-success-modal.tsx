import { useRef } from 'react';
import { useModalRules } from '../../../../hooks/modal-rules';
import { AppRoute } from '../../../../const';
import { useNavigate } from 'react-router-dom';
import { useSelectedProduct } from '../../../../hooks/select-product';

function CatalogAddSuccessModal(): JSX.Element | null {

  const navigate = useNavigate();

  const goToCartRef = useRef<HTMLButtonElement>(null);
  const continueShoppingRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal: closeOriginalModal } = useModalRules([continueShoppingRef, goToCartRef, closeButtonRef]);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();

  // const handleAddButtonClick = () => {
  //   if (selectedProduct) {
  //     const formattedPhone = formatPhoneNumber(phone);
  //     if (!formattedPhone.startsWith('+79')) {
  //       setError('Укажите номер в формате +7(9XX)XXX-XX-XX');
  //       return;
  //     }
  //     dispatch(ordersThunk.postOrder({
  //       body: {
  //         camerasIds: [selectedProduct.id],
  //         coupon: null,
  //         tel: formattedPhone,
  //       }
  //     }))
  //       .then(() => {
  //         handleCloseModal();
  //       })
  //       .catch(() => {
  //         setError('Ошибка при отправке заказа');
  //       });
  //   }
  // };
  const handleCloseModalButtonClick = () => {
    closeOriginalModal();
  };
  const handleContinueShoppingButtonClick = () => {
    navigate(AppRoute.Catalog);
    closeOriginalModal();
  };


  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} />
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--transparent modal__btn"
              onClick={handleContinueShoppingButtonClick}
              ref={continueShoppingRef}
            >
              Продолжить покупки
            </button>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={goToCartRef}

            >
              Перейти в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModalButtonClick}
            ref={closeButtonRef}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

export default CatalogAddSuccessModal;
