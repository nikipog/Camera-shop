type ProductType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

type ProductCategory = 'Видеокамера' | 'Фотоаппарат'

type ProductLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'

type Product = {
    id: number;
    name: string;
    vendorCode: string;
    type: ProductType;
    category: ProductCategory;
    description: string;
    level: ProductLevel;
    price: number;
    rating: number;
    reviewCount: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
    quantity?: number;
}

export type { Product };

