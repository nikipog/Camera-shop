import { memo } from 'react';
import { Review } from '../../types/reviews';
import ProductRating from '../product-rating/product-rating';


type ReviewItemProps = {
  review: Review;
}


const ReviewItem = memo(({ review }: ReviewItemProps): JSX.Element => {

  const { userName, createAt, rating, advantage, disadvantage, review: comment } = review;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">
          {createAt}
        </time>
      </div>
      <div className="rate review-card__rate">
        <ProductRating
          rating={rating}
        />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {comment}
          </p>
        </li>
      </ul>
    </li>

  );
});


ReviewItem.displayName = 'ProductCard';

export default ReviewItem;
