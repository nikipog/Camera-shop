import dayjs from 'dayjs';
import 'dayjs/locale/ru';

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
  if (totalQuantity <= 1) {
    return 0;
  } else if (totalQuantity === 2) {
    return 3;
  } else if (totalQuantity >= 3 && totalQuantity <= 5) {
    return 5;
  } else if (totalQuantity >= 6 && totalQuantity <= 10) {
    return 10;
  } else if (totalQuantity > 10) {
    return 15;
  }
  return 0;
};

export const adjustDiscountByTotalPrice = (totalPrice: number, discountPercent: number): number => {
  if (totalPrice >= 10000 && totalPrice < 20000) {
    return discountPercent - 1;
  } else if (totalPrice >= 20000 && totalPrice < 30000) {
    return discountPercent - 2;
  } else if (totalPrice >= 30000) {
    return discountPercent - 3;
  }
  return discountPercent;
};
