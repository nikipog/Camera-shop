import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Layout from './layout';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';

// Mock the SearchInputField component
vi.mock('../search-input-field/search-input-field', () => ({
  default: vi.fn(() => <div>SearchInputField</div>),
}));

describe('Layout', () => {

  it('renders the layout with main elements', () => {
    const initialState: Partial<State> = {
      'shopping-cart': {
        addedProducts: [],
        totalQuantity: 0,
        totalPrice: 0,
        totalPriceWithDiscount: 0,
        discountPercent: 0,
      },
      orders: {
        status: RequestStatus.Success,
        camerasIds: [],
        coupon: null,
      },
    };
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<Layout />, initialState);
    render(wrappedComponent);

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
