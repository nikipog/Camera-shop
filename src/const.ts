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
  SendOrderError: 'Не удалось отправить данные'
} as const;

export const MAX_RATING_COUNT = 5;

export const MODAL_NAMES = {
  CATALOG_CALL_MODAL: 'CatalogCallModal',
} as const;

export const HttpResponseStatusCodes = {
  SuccessfulResponse: 200,
  ClientErrorResponse: 400,
} as const;
