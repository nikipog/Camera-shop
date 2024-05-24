import { ChangeEvent, useRef, useState } from 'react';
import { useModalRules } from '../../../hooks/modal-rules';
import { useSelectedProduct } from '../../../hooks/select-product';
import { Category, ProductType, formatProductType } from './util';

function CatalogCallModal(): JSX.Element | null {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { modalRef, overlayRef, handleCloseModal: closeOriginalModal } = useModalRules([phoneInputRef, orderButtonRef, closeButtonRef]);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();

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

  const handleCloseModal = () => {
    closeOriginalModal();
    setSelectedProduct(null); // Сбрасываем выбранный товар
  };

  if (!selectedProduct) {
    return null;
  }

  const { category, name, vendorCode, type, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, id, description } = selectedProduct;

  const formattedType = formatProductType(type as ProductType, category as Category);
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
                  srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={previewImg}
                  srcSet={`${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={name.includes('Ретрокамера') ? `${name}` : `${category} ${name}$`}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name.includes('Ретрокамера') ? `${name}` : `${category} ${name}$`}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{formattedType} {category.toLowerCase()}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
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


