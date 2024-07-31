import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { selectAddedProducts, selectTotalPrice, selectTotalPriceWithDiscount } from '../../store/selectors/shopping-cart-selectors';
import { ordersThunk } from '../../store/thunks/order/order';
import { useModalContext } from '../../hooks/modal-context';
import { MODAL_NAMES, RequestStatus } from '../../const';
import { clearCart } from '../../store/slices/shopping-cart/shopping-cart';
import { selectOrderStatus } from '../../store/selectors/order-selectors';


const CartSummary = memo((): JSX.Element => {

  const dispatch = useAppDispatch();
  const { openModal } = useModalContext();
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalPriceWithDiscount = useAppSelector(selectTotalPriceWithDiscount);
  const discountInRubles = totalPrice - totalPriceWithDiscount;
  const addedProducts = useAppSelector(selectAddedProducts);
  const orderStatus = useAppSelector(selectOrderStatus);
  const isLoading = orderStatus === RequestStatus.Loading;


  const handleOrderButtonClick = () => {

    const orderIds = [...addedProducts.map((item) => item.id)];

    dispatch(ordersThunk.postOrder({
      body: {
        camerasIds: orderIds,
        coupon: null,
      }
    }))
      .unwrap()
      .then(() => {
        openModal(MODAL_NAMES.CART_SUCCESS_ORDER_MODAL);
        dispatch(clearCart());
      })
      .catch(() => {
        openModal(MODAL_NAMES.CART_FAILURE_ORDER_MODAL);
      });
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label><span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  disabled={isLoading}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={isLoading}
            >Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={`basket__summary-value${discountInRubles > 0 ? ' basket__summary-value--bonus' : ''}`}>
            {discountInRubles} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {totalPriceWithDiscount.toLocaleString()} ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          disabled={addedProducts.length === 0 || isLoading}
          onClick={handleOrderButtonClick}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
});


CartSummary.displayName = 'CartSummary';

export default CartSummary;
