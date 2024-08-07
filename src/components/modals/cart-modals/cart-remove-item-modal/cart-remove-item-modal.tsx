import { useRef } from 'react';
import { useModalRules } from '../../../../hooks/modal-rules';
import { AppRoute } from '../../../../const';
import { useSelectedProduct } from '../../../../hooks/select-product';

import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import { removeProduct } from '../../../../store/slices/shopping-cart/shopping-cart';
import { useNavigate } from 'react-router-dom';
import { selectAddedProducts } from '../../../../store/selectors/shopping-cart-selectors';

function CartRemoveItemModal(): JSX.Element | null {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addedProducts = useAppSelector(selectAddedProducts);


  const removeProductRef = useRef<HTMLButtonElement>(null);
  const continueShoppingRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { modalRef, overlayRef, handleCloseModal } = useModalRules([removeProductRef, closeButtonRef]);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();


  if (!selectedProduct) {
    return null;
  }
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, category, price, vendorCode, level, type } = selectedProduct;


  const handleRemoveProductButtonClick = () => {
    if (selectedProduct) {
      dispatch(removeProduct(selectedProduct));
      handleCloseModal();
      setSelectedProduct(null);
    }
    if (addedProducts.length - 1 === 0) {
      navigate(AppRoute.Catalog);
    }
  };


  const handleCloseButtonClick = () => {
    handleCloseModal();
    setSelectedProduct(null);
  };

  const handleContinueShoppingButtonClick = () => {
    navigate(AppRoute.Catalog);
    handleCloseModal();
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={overlayRef} data-testid="modal-overlay"/>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4" data-testid="remove-product-message">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">
                {name.includes('Ретрокамера') ? `${name}` : `${category} ${name}`}
              </p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">
                  {type} {category.includes('Фотоаппарат') ? 'фотокамера' : category.toLowerCase()}
                </li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              ref={removeProductRef}
              onClick={handleRemoveProductButtonClick}
            >
              Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={handleContinueShoppingButtonClick}
              ref={continueShoppingRef}
              data-testid="continue-shopping-button"
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            ref={closeButtonRef}
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

export default CartRemoveItemModal;
