export enum AppRoute {
  Catalog = '/',
  Product = '/product/:id',
  Cart = '/cart'
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
    `Для выбранных фильтров минимальная цена товаров от ${minPriceValue !== null ? minPriceValue : ''} руб.`,
  InputValueExceedsToError: (maxPriceValue: number | null) =>
    `Для выбранных фильтров максимальная цена товаров ${maxPriceValue !== null ? maxPriceValue : ''} руб. `,
  ProductQuantityError: 'Количество товара должно быть от 1 до 9',
} as const;

export const MAX_RATING_COUNT = 5;

export const MODAL_NAMES = {
  CATALOG_CALL_MODAL: 'CatalogCallModal',
  CATALOG_ADD_MODAL: 'CatalogAddModal',
  CATALOG_ADD_SUCCESS_MODAL: 'CatalogAddSuccessModal',
  CART_REMOVE_ITEM_MODAL: 'CartRemoveItemModal'
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

export const SortTypesAndOrder = {
  SortByPrice: 'sortPrice',
  SortByPopular: 'sortPopular',
  SortOrderUp: 'up',
  SortOrderDown: 'down'
} as const;

export const PaginationConstants = {
  NoGroups : 0,
  FirstPage : 1,
  AdditionalPages : 2,
  PagesPerGroup : 3,
} as const;

