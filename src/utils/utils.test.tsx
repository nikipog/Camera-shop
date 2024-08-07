import { DiscountAmount } from '../const';
import { adjustDiscountByTotalPrice, getDiscountByQuantity } from './utils';


describe('Discount Calculation', () => {
  it('should return correct discount based on quantity', () => {
    expect(getDiscountByQuantity(1)).toEqual(DiscountAmount.ZeroPercent);
    expect(getDiscountByQuantity(2)).toEqual(DiscountAmount.ThreePercents);
    expect(getDiscountByQuantity(3)).toEqual(DiscountAmount.FivePercents);
    expect(getDiscountByQuantity(6)).toEqual(DiscountAmount.TenPercents);
    expect(getDiscountByQuantity(11)).toEqual(DiscountAmount.FifteenPercents);
  });

  it('should adjust discount based on total price', () => {
    expect(adjustDiscountByTotalPrice(9000, DiscountAmount.TwoPercents)).toEqual(DiscountAmount.TwoPercents);
    expect(adjustDiscountByTotalPrice(15000, DiscountAmount.TwoPercents)).toEqual(DiscountAmount.OnePercent);
    expect(adjustDiscountByTotalPrice(25000, DiscountAmount.TwoPercents)).toEqual(DiscountAmount.ZeroPercent);
    expect(adjustDiscountByTotalPrice(35000, DiscountAmount.ThreePercents)).toEqual(DiscountAmount.ZeroPercent);
  });
});
