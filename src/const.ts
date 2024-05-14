export enum AppRoute {
  Catalog = '/',
  Product = '/product/:id'
}

export const Endpoint = {
  Cameras: '/cameras'
} as const;

export const enum RequestStatus { Idle, Loading, Success, Failed }

