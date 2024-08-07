import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';
import ProductPage from './product-page';
import { State } from '../../types/state';
import { RequestStatus } from '../../const';
import { MOCK_PRODUCT, MOCK_REVIEW } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';

describe('ProductPage', () => {
  let initialState: Partial<State>;

  beforeEach(() => {
    initialState = {
      product: {
        status: RequestStatus.Success,
        product: MOCK_PRODUCT,
      },
      reviews: {
        reviews: [MOCK_REVIEW],
        status: RequestStatus.Success,
      },
      'shopping-cart': {
        addedProducts: [],
        totalQuantity: 0,
        totalPrice: 0,
        totalPriceWithDiscount: 0,
        discountPercent: 0,
      },
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('should render product details correctly', () => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <HelmetProvider>
        <ProductPage />
      </HelmetProvider>,
      initialState
    );
    render(wrappedComponent);

    // Найдем элемент по уникальному селектору и проверим текст
    const productTitleElement = screen.getByRole('heading', { name: /Prof Lite Zero/i });
    expect(productTitleElement).toBeInTheDocument();

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should render reviews correctly', () => {
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <HelmetProvider>
        <ProductPage />
      </HelmetProvider>,
      initialState
    );
    render(wrappedComponent);

    const reviewElements = screen.getAllByText(MOCK_REVIEW.userName, { exact: false });
    expect(reviewElements.length).toBeGreaterThan(0);
    expect(screen.getByText(MOCK_REVIEW.review, { exact: false })).toBeInTheDocument();
  });

  it('should display loading message when product is loading', () => {
    initialState.product = {
      status: RequestStatus.Loading,
      product: null,
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <HelmetProvider>
        <ProductPage />
      </HelmetProvider>,
      initialState
    );
    render(wrappedComponent);

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should display error message when product is not found', () => {
    initialState.product = {
      status: RequestStatus.Failed,
      product: null,
    };

    const { wrappedComponent } = withMemoryStoreWrapperAndContext(
      <HelmetProvider>
        <ProductPage />
      </HelmetProvider>,
      initialState
    );
    render(wrappedComponent);

    expect(screen.getByText(/No product found/i)).toBeInTheDocument();
  });
});
