import { memo } from 'react';


const BasketIcon = memo((): JSX.Element => {

  let nothing = 1;

  return (
    <a className="header__basket-link" href="#">
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      <span className="header__basket-count">3</span>
    </a>

  );
});


BasketIcon.displayName = 'ProductCard';

export default BasketIcon;
