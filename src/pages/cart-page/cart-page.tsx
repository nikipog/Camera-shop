import { memo } from 'react';
import CartList from '../../components/cart-list/cart-list';

import { useAppSelector } from '../../hooks/store';
import { selectAddedProducts } from '../../store/selectors/shopping-cart-selectors';
import CartSummary from '../../components/cart-summary/cart-summary';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const CartPage = memo((): JSX.Element => {
  const addedProducts = useAppSelector(selectAddedProducts);

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoute.Catalog}
                >
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoute.Catalog}
                >
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Корзина
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <CartList addedProducts={addedProducts} />
            <CartSummary />
          </div>
        </section>
      </div>
    </main>

  );
});

CartPage.displayName = 'CartPage';

export default CartPage;
