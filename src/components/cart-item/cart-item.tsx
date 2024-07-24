

import { memo } from 'react';
import { Product } from '../../types/product';


type CartItemProps = {
  addedProduct: Product;
  //onProductClick: (modalName: string, product: Product) => void;
}


const CartItem = memo(({ addedProduct }: CartItemProps): JSX.Element => {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, category, name, price, quantity, vendorCode, type, level } = addedProduct;
  const totalPricePerProduct = (quantity || 0) * price;

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
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={quantity}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
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

