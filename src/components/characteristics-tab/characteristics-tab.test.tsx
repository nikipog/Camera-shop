import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CharacteristicsTab from './characteristics-tab';


describe('CharacteristicsTab', () => {
  it('renders the characteristics correctly', () => {
    const props = {
      vendorCode: '12345',
      category: 'Camera',
      type: 'Digital',
      level: 'Professional',
    };

    render(<CharacteristicsTab {...props} />);

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(props.vendorCode)).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText(props.category)).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText(props.type)).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
    expect(screen.getByText(props.level)).toBeInTheDocument();
  });
});
