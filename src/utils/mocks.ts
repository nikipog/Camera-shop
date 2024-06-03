import { Product } from '../types/product';

export const mockProducts: Product[] = [{
  id: 40,
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

