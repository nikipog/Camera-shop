

import React, { memo, useState } from 'react';
import { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addProduct, decrementProductQuantity, setProductQuantity } from '../../store/slices/shopping-cart/shopping-cart';
import { MODAL_NAMES, RequestStatus, ToastifyMessages } from '../../const';
import './error-tooltip.css';
import { useModalContext } from '../../hooks/modal-context';
import { useSelectedProduct } from '../../hooks/select-product';
import { selectOrderStatus } from '../../store/selectors/order-selectors';


type CartItemProps = {
  addedProduct: Product;
}


const CartItem = memo(({ addedProduct }: CartItemProps): JSX.Element => {

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, category, name, price, quantity, vendorCode, type, level, id } = addedProduct;
  const [productQuantity, setLocalProductQuantity] = useState<number | string | undefined>(quantity);
  const [previousQuantity, setPreviousQuantity] = useState<number | string | undefined>(quantity);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const totalPricePerProduct = (quantity || 0) * price;
  const dispatch = useAppDispatch();
  const { openModal } = useModalContext();
  const { setSelectedProduct } = useSelectedProduct();
  const orderStatus = useAppSelector(selectOrderStatus);
  const isLoading = orderStatus === RequestStatus.Loading;

  const handleIncrementButtonClick = () => {
    dispatch(addProduct(addedProduct));
    if ((quantity || 0) < 9) {

      setLocalProductQuantity((quantity || 0) + 1);
    }
  };
  const handleDecrementButtonClick = () => {
    dispatch(decrementProductQuantity(addedProduct));
    if ((quantity || 0) > 1) {
      setLocalProductQuantity((quantity || 0) - 1);
    }
  };

  const handleProductQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.value;
    const newQuantityNumber = Number(newQuantity);

    if (newQuantity === '' || (newQuantityNumber >= 1 && newQuantityNumber <= 9)) {
      setLocalProductQuantity(newQuantity);
      if (newQuantityNumber >= 1 && newQuantityNumber <= 9) {
        setQuantityError(null);
        if (errorTimeout) {
          clearTimeout(errorTimeout);
          setErrorTimeout(null);
        }
        dispatch(setProductQuantity({ id, newQuantity: newQuantityNumber }));
      } else {
        if (errorTimeout) {
          clearTimeout(errorTimeout);
          setErrorTimeout(null);
        }
        const timeout = setTimeout(() => {
          setQuantityError(ToastifyMessages.ProductQuantityError);
          setErrorTimeout(null);
        }, 2000);
        setErrorTimeout(timeout);
      }
    }
  };

  const handleFocus = () => {
    setPreviousQuantity(productQuantity);
    setQuantityError(null);
  };

  const handleBlur = () => {
    if (productQuantity === '' || isNaN(Number(productQuantity))) {
      setLocalProductQuantity(previousQuantity);
      dispatch(setProductQuantity({ id, newQuantity: Number(previousQuantity) }));
      setQuantityError(null);
    }
    setQuantityError(null);
  };

  const handleRemoveButtonClick = () => {
    openModal(MODAL_NAMES.CART_REMOVE_ITEM_MODAL);
    setSelectedProduct(addedProduct);
  };


  return (
    <li className="basket-item">
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
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
      </p>
      <div className="quantity">

        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecrementButtonClick}
          disabled={isLoading}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>

        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={productQuantity}
          min={1}
          max={9}
          aria-label="количество товара"
          onChange={handleProductQuantityInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLoading}
        />
        {quantityError && <div className="error-tooltip">{quantityError}</div>}
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncrementButtonClick}
          disabled={isLoading}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>

      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{totalPricePerProduct.toLocaleString()} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveButtonClick}
        disabled={isLoading}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
});


CartItem.displayName = 'CartItem';

export default CartItem;

