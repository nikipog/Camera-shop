import { useRef, useState } from 'react';
import { useModalRules } from '../../../hooks/modal-rules';
import { useSelectedProduct } from '../../../hooks/select-product';
import { Category, ProductType, formatProductType } from './util';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { ordersThunk } from '../../../store/thunks/order/order';
import { RequestStatus } from '../../../const';
import { selectOrderStatus } from '../../../store/selectors/order-selectors';
import { createHandlePhoneInput, formatPhoneNumber, handlePhoneKeyDown, handlePhonePaste } from '../../../utils/phone-validation';

function CatalogCallModal(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { modalRef, overlayRef, handleCloseModal: closeOriginalModal } = useModalRules([phoneInputRef, orderButtonRef, closeButtonRef]);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();
  const status = useAppSelector(selectOrderStatus);

  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>(''); // состояние для сообщения

  const handlePhoneInput = createHandlePhoneInput(setPhone);

  const handleCloseModal = () => {
    closeOriginalModal();
    setSelectedProduct(null); // Сбрасываем выбранный товар
  };

  const handleSubmit = () => {
    if (selectedProduct) {
      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone.startsWith('+79')) {
        setError('Укажите номер в формате +7(9XX)XXX-XX-XX');
        return;
      }
      dispatch(ordersThunk.postOrder({
        body: {
          camerasIds: [selectedProduct.id],
          coupon: null,
          tel: formattedPhone,
        }
      }))
        .unwrap()
        .then(() => {
          handleCloseModal();
        })
        .catch(() => {
          setError('Ошибка при отправке заказа');
        });
    }
  };


  if (!selectedProduct) {
    return null;
  }

  const { category, name, vendorCode, type, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price } = selectedProduct;

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
          <div className={`custom-input form-review__item ${error ? 'is-invalid' : ''}`}>
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
                //value={phone}
                onInput={handlePhoneInput}
                onKeyDown={handlePhoneKeyDown}
                onPaste={handlePhonePaste}
              />
            </label>
            {error && <p className="custom-input__error is-invalid">Укажите номер в формате +7(9XX)XXX-XX-XX</p>}
          </div>
          <div className="modal__buttons">
            <button
              ref={orderButtonRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleSubmit}
              disabled={status === RequestStatus.Loading}
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

// const isIntermediateValidPhoneNumberPlusSeven = (phoneNumber: string): boolean => {
//   const regex = /^(\+?7|8)?9\d{9}$/;
//   return regex.test(phoneNumber);
// };

// const isIntermediateValidPhoneNumberEight = (phoneNumber: string): boolean => {
//   const regex = /^(\+?7|8)?9\d{9}$/;
//   return regex.test(phoneNumber);
// };

// const isValidPhoneNumber = (phoneNumber: string): boolean => {
//   const regex = /^(?:\+7|8)\s?\(?9\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
//   return regex.test(phoneNumber);
// };

// const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
//   const value = event.target.value;

//   if (value.startsWith('+') && isIntermediateValidPhoneNumberPlusSeven(value)) {
//     setPhone(value);
//     setError('');
//   } else if (value.startsWith('8') && isIntermediateValidPhoneNumberEight(value)) {
//     setPhone(value);
//     setError('');
//   } else if (value.length >= 11 && !isValidPhoneNumber(value)) {
//     setError('Введите номер в формате +7(9XX)XXX-XX-XX или 8(9XX)XXX-XX-XX');
//   } else {
//     setError('');
//   }
// };
