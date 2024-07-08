import { Fragment } from 'react';
import { MAX_RATING_COUNT } from '../../const';

type ProductRatingProps = {
  rating: number;
}

function ProductRating({ rating }: ProductRatingProps): JSX.Element {
  const fullStars = Array.from({ length: rating }, () => (
    <svg key={crypto.randomUUID()} width={17} height={16} aria-hidden="true" data-testid="full-star">
      <use xlinkHref="#icon-full-star" />
    </svg>
  ));

  const emptyStars = Array.from({ length: MAX_RATING_COUNT - rating }, () => (
    <svg key={crypto.randomUUID()} width={17} height={16} aria-hidden="true" data-testid="empty-star">
      <use xlinkHref="#icon-star" />
    </svg>
  ));

  return (
    <Fragment>
      {fullStars.concat(emptyStars)}
    </Fragment>
  );
}

export default ProductRating;
