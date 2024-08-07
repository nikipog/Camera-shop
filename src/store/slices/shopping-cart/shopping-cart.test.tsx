// store/slices/shopping-cart/shopping-cart.test.tsx
import { MOCK_PRODUCT } from '../../../utils/mocks';
import { shoppingCartSlice, addProduct, removeProduct, decrementProductQuantity, setProductQuantity, clearCart } from './shopping-cart';

// Определяем начальное состояние для тестов
const getState = (overrides = {}) => ({
  addedProducts: [{ ...MOCK_PRODUCT, quantity: 1 }],
  totalPrice: MOCK_PRODUCT.price,
  totalQuantity: 1,
  discountPercent: 0,
  totalPriceWithDiscount: MOCK_PRODUCT.price,
  ...overrides,
});

const getInitialState = () => ({
  addedProducts: [],
  totalPrice: 0,
  totalQuantity: 0,
  discountPercent: 0,
  totalPriceWithDiscount: 0,
});

describe('Shopping Cart Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = getState();
    const result = shoppingCartSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = getInitialState();
    const result = shoppingCartSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should add product with "addProduct" action', () => {
    const state = getInitialState();
    const expectedState = getState();
    const result = shoppingCartSlice.reducer(state, addProduct(MOCK_PRODUCT));
    expect(result).toEqual(expectedState);
  });

  it('should remove product with "removeProduct" action', () => {
    const state = getState();
    const expectedState = getInitialState();
    const result = shoppingCartSlice.reducer(state, removeProduct(MOCK_PRODUCT));
    expect(result).toEqual(expectedState);
  });

  it('should decrement product quantity with "decrementProductQuantity" action', () => {
    const state = getState({ addedProducts: [{ ...MOCK_PRODUCT, quantity: 2 }] });
    const expectedState = getState();
    const result = shoppingCartSlice.reducer(state, decrementProductQuantity(MOCK_PRODUCT));
    expect(result).toEqual(expectedState);
  });

  it('should set product quantity with "setProductQuantity" action', () => {
    const state = getState();
    const expectedState = getState({
      addedProducts: [{ ...MOCK_PRODUCT, quantity: 5 }],
      totalQuantity: 5,
      totalPrice: MOCK_PRODUCT.price * 5,
      discountPercent: 2,
      totalPriceWithDiscount: Math.round(MOCK_PRODUCT.price * 5 * 0.98) // 2% скидка
    });
    const result = shoppingCartSlice.reducer(state, setProductQuantity({ id: MOCK_PRODUCT.id, newQuantity: 5 }));
    expect(result).toEqual(expectedState);
  });

  it('should clear cart with "clearCart" action', () => {
    const state = getState();
    const expectedState = getInitialState();
    const result = shoppingCartSlice.reducer(state, clearCart());
    expect(result).toEqual(expectedState);
  });

  it('should update totals correctly with "updateTotals" action', () => {
    const state = getState({ addedProducts: [{ ...MOCK_PRODUCT, quantity: 3 }] });
    const expectedState = getState({
      addedProducts: [{ ...MOCK_PRODUCT, quantity: 3 }],
      totalQuantity: 3,
      totalPrice: MOCK_PRODUCT.price * 3,
      discountPercent: 2,
      totalPriceWithDiscount: Math.round(MOCK_PRODUCT.price * 3 * 0.98) // 2% скидка
    });
    const result = shoppingCartSlice.reducer(state, shoppingCartSlice.actions.updateTotals());
    expect(result).toEqual(expectedState);
  });
});
