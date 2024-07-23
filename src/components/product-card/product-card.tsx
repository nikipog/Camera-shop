import { memo } from 'react';
import { Product } from '../../types/product';
import ProductRating from '../product-rating/product-rating';
import { AppRoute, MODAL_NAMES } from '../../const';
import { Link, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { selectAddedProducts } from '../../store/selectors/shopping-cart-selectors';


type ProductCardProps = {
  product: Product;
  onProductClick: (modalName: string, product: Product) => void;
}


const ProductCard = memo(({ product, onProductClick }: ProductCardProps): JSX.Element => {
  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, reviewCount, price, rating, category, id } = product;

  const url = generatePath(AppRoute.Product, { id: id.toString() });

  const addedProducts = useAppSelector(selectAddedProducts);


  const isInCart = addedProducts.some((item) => item.id === id);


  const handleButtonClick = () => {
    onProductClick(MODAL_NAMES.CATALOG_ADD_MODAL, product);
  };

  return (
    <div className="product-card" data-testid="card-value">
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
          {name.includes('Ретрокамера') ? `${name}` : `${category} ${name}`}
        </p>
        <p className="product-card__price" data-testid="product-price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {!isInCart &&
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleButtonClick}
          >
            Купить
          </button>}

        {isInCart &&
          <Link
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            to={AppRoute.Cart}
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>}

        <Link
          className="btn btn--transparent"
          to={url}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
});


ProductCard.displayName = 'ProductCard';

export default ProductCard;
