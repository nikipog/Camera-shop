// Константы для категорий
const CATEGORY_CAMERA = 'Фотоаппарат';
const CATEGORY_VIDEO_CAMERA = 'Видеокамера';

// Константы для типов
const TYPE_COLLECTION = 'Коллекционная';
const TYPE_INSTANT = 'Моментальная';
const TYPE_DIGITAL = 'Цифровая';
const TYPE_FILM = 'Плёночная';

// Константы для измененных типов для категории Фотоаппарат
const TYPE_COLLECTION_MALE = 'Коллекционный';
const TYPE_INSTANT_MALE = 'Моментальный';
const TYPE_DIGITAL_MALE = 'Цифровой';
const TYPE_FILM_MALE = 'Плёночный';

// Типы для категорий и типов продукта
export type Category = typeof CATEGORY_CAMERA | typeof CATEGORY_VIDEO_CAMERA;
export type ProductType = typeof TYPE_COLLECTION | typeof TYPE_INSTANT | typeof TYPE_DIGITAL | typeof TYPE_FILM;

const genderedTypes: Record<ProductType, Record<Category, string>> = {
  [TYPE_COLLECTION]: { [CATEGORY_VIDEO_CAMERA]: TYPE_COLLECTION, [CATEGORY_CAMERA]: TYPE_COLLECTION_MALE },
  [TYPE_INSTANT]: { [CATEGORY_VIDEO_CAMERA]: TYPE_INSTANT, [CATEGORY_CAMERA]: TYPE_INSTANT_MALE },
  [TYPE_DIGITAL]: { [CATEGORY_VIDEO_CAMERA]: TYPE_DIGITAL, [CATEGORY_CAMERA]: TYPE_DIGITAL_MALE },
  [TYPE_FILM]: { [CATEGORY_VIDEO_CAMERA]: TYPE_FILM, [CATEGORY_CAMERA]: TYPE_FILM_MALE },
};

function formatProductType(type: ProductType, category: Category): string {
  return genderedTypes[type]?.[category] || type;
}

export {formatProductType};
