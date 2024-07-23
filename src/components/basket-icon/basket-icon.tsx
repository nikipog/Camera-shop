import { memo } from 'react';
import { useAppSelector } from '../../hooks/store';
import { selectAddedProducts, selectTotalQuantity } from '../../store/selectors/shopping-cart-selectors';


const BasketIcon = memo((): JSX.Element => {


  const totalProductQuantity = useAppSelector(selectTotalQuantity);
  const addedProducts = useAppSelector(selectAddedProducts);

  return (
    <a className="header__basket-link" href="#">
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {addedProducts.length > 0 &&
        <span className="header__basket-count">{totalProductQuantity}</span>}
    </a>
  );
});


BasketIcon.displayName = 'ProductCard';

export default BasketIcon;
