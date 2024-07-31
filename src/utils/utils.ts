import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DiscountAmount, OrderAmountRange, ProductQuantityDiscountRange } from '../const';

const DayjsFormats = {
  LocaleRussia: 'ru',
  TimeFormatDayMonth: 'DD MMMM',
} as const;

export const formatReviewDate = (date: string): string => {
  const parsedDate = dayjs(date); // таким образом получаю специальный объект dayjs для доступа к его свойствам. т.к в нем $L: 'eng' то изменяю это с помощью спец метода ниже
  const localizedDate = parsedDate.locale(DayjsFormats.LocaleRussia); // вызываю метод locale и указываю какая локализация должна быть
  return localizedDate.format(DayjsFormats.TimeFormatDayMonth); // форматирую в соответствии с техзаданием
};


export const getDiscountByQuantity = (totalQuantity: number): number => {
  if (totalQuantity <= ProductQuantityDiscountRange.OneProduct) {
    return DiscountAmount.ZeroPercent;
  } else if (totalQuantity === ProductQuantityDiscountRange.TwoProducts) {
    return DiscountAmount.ThreePercents;
  } else if (totalQuantity >= ProductQuantityDiscountRange.ThreeProducts && totalQuantity <= ProductQuantityDiscountRange.FiveProducts) {
    return DiscountAmount.FivePercents;
  } else if (totalQuantity >= ProductQuantityDiscountRange.SixProducts && totalQuantity <= ProductQuantityDiscountRange.TenProducts) {
    return DiscountAmount.TenPercents;
  } else if (totalQuantity > ProductQuantityDiscountRange.TenProducts) {
    return DiscountAmount.FifteenPercents;
  }
  return DiscountAmount.ZeroPercent;
};


export const adjustDiscountByTotalPrice = (totalPrice: number, discountPercent: number): number => {
  if (totalPrice >= OrderAmountRange.TenThousand && totalPrice < OrderAmountRange.TwentyThousand) {
    return discountPercent - DiscountAmount.OnePercent;
  } else if (totalPrice >= OrderAmountRange.TwentyThousand && totalPrice < OrderAmountRange.ThirtyThousand) {
    return discountPercent - DiscountAmount.TwoPercents;
  } else if (totalPrice >= OrderAmountRange.ThirtyThousand) {
    return discountPercent - DiscountAmount.ThreePercents;
  }
  return discountPercent;
};
