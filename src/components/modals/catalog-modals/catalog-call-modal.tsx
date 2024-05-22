import { ChangeEvent, useRef, useState } from 'react';
import { useModalRules } from '../../../hooks/modal-rules';

function CatalogCallModal(): JSX.Element {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { modalRef, overlayRef, handleCloseModal } = useModalRules([phoneInputRef, orderButtonRef, closeButtonRef]);

  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const phoneRegex = /^(\+7|8)?\(?9\d{2}\)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
    if (phoneRegex.test(value)) {
      setError('');
    } else {
      setError('Неправильный формат номера');
    }
    setPhone(value);
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} />
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"
                />
                <img
                  src="img/content/img9.jpg"
                  srcSet="img/content/img9@2x.jpg 2x"
                  width={140}
                  height={120}
                  alt="Фотоаппарат «Орлёнок»"
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">O78DFGSD832</span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>18 970 ₽
              </p>
            </div>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">
                Телефон
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={phoneInputRef}
                type="tel"
                name="user-tel"
                placeholder="Введите ваш номер"

                required
                value={phone}
                onInput={handlePhoneChange}
              />
            </label>
            {error && <p className="custom-input__error">{error}</p>}
          </div>
          <div className="modal__buttons">
            <button
              ref={orderButtonRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Заказать
            </button>
          </div>
          <button
            ref={closeButtonRef}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModal}
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

export default CatalogCallModal;
