export enum AppRoute {
  Catalog = '/',
  Product = '/product/:id'
}

export const Endpoint = {
  Cameras: '/cameras',
  Orders: '/orders',
} as const;


export const enum RequestStatus { Idle, Loading, Success, Failed }

export const ToastifyMessages = {
  FetchProductsError: 'Не удалось загрузить данные с сервера',
  AuthError: 'Ошибка отправки данных на сервер',
  SendOrderError: 'Не удалось отправить данные',
  PriceFromExceedsToError: () => 'Цена "от" не может превышать цену в поле "до"',
  PriceToLessThenFromError: () => 'Цена "до" не может быть меньше цены в поле "от"',
  InputValueLessThanPriceTo: (minPriceValue: number | null) =>
    `Минимальная цена товаров от ${minPriceValue !== null ? minPriceValue : ''} руб.`,
  InputValueExceedsToError: (maxPriceValue: number | null) =>
    `Максимальная цена товаров до ${maxPriceValue !== null ? maxPriceValue : ''} руб. `
} as const;

export const MAX_RATING_COUNT = 5;

export const MODAL_NAMES = {
  CATALOG_CALL_MODAL: 'CatalogCallModal',
} as const;

export const HttpResponseStatusCodes = {
  SuccessfulResponse: 200,
  ClientErrorResponse: 400,
} as const;

export const EmptyFilters = {
  NoProducts: 0,
  NoFilters: 0
} as const;

export const PriceInputNames = {
  MinPrice: 'minPrice',
  MaxPrice: 'maxPrice'
} as const;

export const ForbiddenVideocategories = {
  InstantType: 'Моментальная',
  FilmType: 'Плёночная'
} as const;


