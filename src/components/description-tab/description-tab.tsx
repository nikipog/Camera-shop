import { memo } from 'react';

interface DescriptionTabProps {
  description: string;
}

const DescriptionTab = memo(({ description }: DescriptionTabProps) => (
  <div className="product__tabs-text">
    <p>{description}</p>
  </div>
));

DescriptionTab.displayName = 'DescriptionTab';

export default DescriptionTab;
