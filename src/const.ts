export enum AppRoute {
  Catalog = '/',
  Product = '/product/:id'
}

export const Endpoint = {
  Cameras: '/cameras'
} as const;

export const enum RequestStatus { Idle, Loading, Success, Failed }

export const ToastifyMessages = {
  FetchProductsError: 'Не удалось загрузить данные с сервера',
  AuthError: 'Ошибка отправки данных на сервер'
} as const;

export const MAX_RATING_COUNT = 5;

