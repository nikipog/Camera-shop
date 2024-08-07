import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalRules } from '../../../../hooks/modal-rules';
import { AppRoute } from '../../../../const';

function CartSuccessOrderModal(): JSX.Element | null {


  const navigate = useNavigate();


  const removeProductRef = useRef<HTMLButtonElement>(null);
  const continueShoppingRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal } = useModalRules([removeProductRef, closeButtonRef]);

  const handleCloseButtonClick = () => {
    handleCloseModal();
  };

  const handleContinueShoppingButtonClick = () => {
    navigate(AppRoute.Catalog);
    handleCloseModal();
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} data-testid="modal-overlay"/>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleContinueShoppingButtonClick}
              ref={continueShoppingRef}
              data-testid="continue-shopping-button"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
            data-testid="close-modal-button"
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

export default CartSuccessOrderModal;
