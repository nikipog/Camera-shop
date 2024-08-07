import { useRef } from 'react';
import { useModalRules } from '../../../../hooks/modal-rules';
import { AppRoute } from '../../../../const';
import { useNavigate } from 'react-router-dom';

function CatalogAddSuccessModal(): JSX.Element | null {

  const navigate = useNavigate();

  const goToCartRef = useRef<HTMLButtonElement>(null);
  const continueShoppingRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal: closeOriginalModal } = useModalRules([continueShoppingRef, goToCartRef, closeButtonRef]);


  const handleCloseModalButtonClick = () => {
    closeOriginalModal();
  };
  const handleContinueShoppingButtonClick = () => {
    navigate(AppRoute.Catalog);
    closeOriginalModal();
  };

  const handleGoToCartButtonClick = () => {
    navigate(AppRoute.Cart);
    closeOriginalModal();
  };


  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} data-testid="modal-overlay"/>
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
              onClick={handleGoToCartButtonClick}

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
