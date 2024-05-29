import { memo } from 'react';

interface CharacteristicsTabProps {
  vendorCode: string;
  category: string;
  type: string;
  level: string;
}

const CharacteristicsTab = memo(({ vendorCode, category, type, level }: CharacteristicsTabProps) => (

  <ul className="product__tabs-list">
    <li className="item-list">
      <span className="item-list__title">Артикул:</span>
      <p className="item-list__text">{vendorCode}</p>
    </li>
    <li className="item-list">
      <span className="item-list__title">Категория:</span>
      <p className="item-list__text">{category}</p>
    </li>
    <li className="item-list">
      <span className="item-list__title">Тип камеры:</span>
      <p className="item-list__text">{type}</p>
    </li>
    <li className="item-list">
      <span className="item-list__title">Уровень:</span>
      <p className="item-list__text">{level}</p>
    </li>
  </ul>
));

CharacteristicsTab.displayName = 'CharacteristicsTab';

export default CharacteristicsTab;
