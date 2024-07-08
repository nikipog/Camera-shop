import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Layout from './layout';

// Mock the SearchInputField component
vi.mock('../search-input-field/search-input-field', () => ({
  default: vi.fn(() => <div>SearchInputField</div>),
}));

describe('Layout', () => {
  it('renders the layout with main elements', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Проверка наличия логотипов
    expect(screen.getAllByLabelText(/Переход на главную/i)).toHaveLength(2);

    // Проверка наличия основных ссылок навигации
    expect(screen.getAllByText(/Каталог/i)).toHaveLength(2);
    expect(screen.getAllByText(/Гарантии/i)).toHaveLength(2);
    expect(screen.getAllByText(/Доставка/i)).toHaveLength(2);
    expect(screen.getAllByText(/О компании/i)).toHaveLength(2);


    // Проверка рендера компонента SearchInputField
    expect(screen.getByText(/SearchInputField/i)).toBeInTheDocument();

    // Проверка наличия элементов футера
    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
