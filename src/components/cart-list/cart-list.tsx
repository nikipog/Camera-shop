import { memo } from 'react';
import { Product } from '../../types/product';
import CartItem from '../cart-item/cart-item';


type CartListProps = {
  addedProducts: Product[];
}

const CartList = memo(({ addedProducts }: CartListProps): JSX.Element => (
  <ul className="basket__list">
    {addedProducts.map((product) => (
      <CartItem
        key={product.id}
        addedProduct={product}
      />
    ))}
  </ul>
));


CartList.displayName = 'CartList';

export default CartList;
