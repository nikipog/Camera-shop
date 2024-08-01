import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalRules } from '../../../../hooks/modal-rules';
import { AppRoute } from '../../../../const';
import styles from './cart-failure-order-modal.module.css';

function CartFailureOrderModal(): JSX.Element | null {


  const navigate = useNavigate();

  const continueShoppingRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal } = useModalRules([continueShoppingRef, closeButtonRef]);

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
        <div className="modal__overlay" ref={overlayRef} />
        <div className={`modal__content ${styles.modalContent}`} ref={modalRef}>
          <p className={`title title--h4 ${styles.title}`}>Не удалось оформить заказ</p>
          <svg className='modal__icon' width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-sad-smiley" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleContinueShoppingButtonClick}
              ref={continueShoppingRef}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            ref={closeButtonRef}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
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

export default CartFailureOrderModal;
