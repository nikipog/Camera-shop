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
