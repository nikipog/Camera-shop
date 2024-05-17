import { memo } from 'react';
import { Product } from '../../types/product';
import ProductRating from '../product-rating/product-rating';
import { useModal } from '../../hooks/context';
import { MODAL_NAMES } from '../../const';


type ProductCardProps = {
  product: Product;
}


const ProductCard = memo(({ product }: ProductCardProps): JSX.Element => {
  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, reviewCount, price, rating } = product;
  const { openModal} = useModal();

  const handleOpenModal = (modalName: string) => () => openModal(modalName);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <ProductRating
            rating={rating}
          />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleOpenModal(MODAL_NAMES.CATALOG_CALL_MODAL)}
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
});


ProductCard.displayName = 'ProductCard';

export default ProductCard;
