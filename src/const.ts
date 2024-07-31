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

export const ToastifyMessage = {
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

export const ModalName = {
  CatalogCallModal: 'CatalogCallModal',
  CatalogAddModal: 'CatalogAddModal',
  CatalogAddSuccessModal: 'CatalogAddSuccessModal',
  CartRemoveItemModal: 'CartRemoveItemModal',
  CartSuccessOrderModal: 'CartSuccessOrderModal',
  CartFailureOrderModal: 'CartFailureOrderModal',

} as const;

export const HttpResponseStatusCode = {
  SuccessfulResponse: 200,
  ClientErrorResponse: 400,
} as const;

export const EmptyFilters = {
  NoProducts: 0,
  NoFilters: 0
} as const;

export const PriceInputName = {
  MinPrice: 'minPrice',
  MaxPrice: 'maxPrice'
} as const;

export const ForbiddenVideocategory = {
  InstantType: 'Моментальная',
  FilmType: 'Плёночная'
} as const;

export const SortTypesAndOrder = {
  SortByPrice: 'sortPrice',
  SortByPopular: 'sortPopular',
  SortOrderUp: 'up',
  SortOrderDown: 'down'
} as const;

export const PaginationConstant = {
  NoGroups : 0,
  FirstPage : 1,
  AdditionalPages : 2,
  PagesPerGroup : 3,
} as const;

export const DiscountAmount = {
  ZeroPercent: 0,
  OnePercent: 1,
  TwoPercents: 2,
  ThreePercents: 3,
  FivePercents: 5,
  TenPercents: 10,
  FifteenPercents: 15,
} as const;

export const ProductQuantityDiscountRange = {
  OneProduct: 1,
  TwoProducts: 2,
  ThreeProducts: 3,
  FiveProducts: 5,
  SixProducts: 6,
  TenProducts: 10
} as const;

export const OrderAmountRange = {
  TenThousand: 10000,
  TwentyThousand: 20000,
  ThirtyThousand: 30000
} as const;

export enum ArrayMethodParameter {
  RemoveFromZeroIndex = 0,
  StartAccumulationFromZero = 0,
}

export const PERCENT_TOTAL = 100;

export const CartConstant = {
  NoDiscount: 0,
  EmptyCart: 0,
  NoProduct: 0,
  MaxQuantityPerOneProduct: 9,
  OneProduct: 1,
} as const;

