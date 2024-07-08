import { ThunkDispatch } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { createApi } from '../services/api';
import { State } from '../types/state';
import { Action } from 'redux';

export const PRODUCT_MOCK_ID = 1;
//1)передаем тип, соответствующий структуре хранилища, 2) указываем тип для экстра-аргумента
// (экземпляр axios) чтобы не обращаться к нему напрямую, используем return type (получаем тип на основании возвращаемого
//значения функции) 3) action - возможные дейсвтия, без ограничений

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

// функция по извлечению типа действия. Когда обращаемся к store.getActions(), возвращается
//слишком много информации. Эта функция извлекает только тип действия
// аргументом принимает массив объектов, соответствующих интерфейсу Actions и возвращает резултат трансформации этого массива
// в итоге получится массив строк, содержащих название действия, которое было задиспатчено
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);


export const mockProducts: Product[] = [{
  id: 1,
  name: 'Prof Lite Zero',
  vendorCode: 'PL34ZO',
  type: 'Цифровая',
  category: 'Видеокамера',
  description: '20-кратный зум, подвижный ЖК-экран с поворотом на 360 градусов, встроенная стабилизация, удобная посадка в руки - лучший вариант для старта.',
  previewImg: 'img/content/prof-lite-zero.jpg',
  level: 'Нулевой',
  price: 35000,
  previewImg2x: 'img/content/prof-lite-zero@2x.jpg',
  previewImgWebp: 'img/content/prof-lite-zero.webp',
  previewImgWebp2x: 'img/content/prof-lite-zero@2x.webp',
  rating: 3,
  reviewCount: 20
},
{
  id: 2,
  name: 'FastShot MR-5',
  vendorCode: 'JH34KHN895',
  type: 'Моментальная',
  category: 'Фотоаппарат',
  description: 'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
  previewImg: 'img/content/fast-shot.jpg',
  level: 'Любительский',
  price: 18970,
  previewImg2x: 'img/content/fast-shot@2x.jpg',
  previewImgWebp: 'img/content/fast-shot.webp',
  previewImgWebp2x: 'img/content/fast-shot@2x.webp',
  rating: 2,
  reviewCount: 4
}
];

export const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Prof Lite Zero',
  vendorCode: 'PL34ZO',
  type: 'Цифровая',
  category: 'Видеокамера',
  description: '20-кратный зум, подвижный ЖК-экран с поворотом на 360 градусов, встроенная стабилизация, удобная посадка в руки - лучший вариант для старта.',
  previewImg: 'img/content/prof-lite-zero.jpg',
  level: 'Нулевой',
  price: 35000,
  previewImg2x: 'img/content/prof-lite-zero@2x.jpg',
  previewImgWebp: 'img/content/prof-lite-zero.webp',
  previewImgWebp2x: 'img/content/prof-lite-zero@2x.webp',
  rating: 3,
  reviewCount: 20
};

export const MOCK_REVIEW =
{
  id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
  createAt: '2022-07-09T13:24:57.980Z',
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 4
};


export const MOCK_ORDER = {
  camerasIds: [1],
  coupon: null,
  tel: '+79998887766'
};

export const mockReviews =
  [
    {
      id: '1',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя первая камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '2',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 2 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '3',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 3 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '4',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 4 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '5',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 5 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '6',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 6 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '7',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 7 камера. Я в восторге, нареканий нет',
      rating: 4
    },
    {
      id: '8',
      createAt: '2022-07-09T13:24:57.980Z',
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя 8 камера. Я в восторге, нареканий нет',
      rating: 4
    },

  ];


