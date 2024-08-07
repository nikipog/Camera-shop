import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useModalContext } from '../../hooks/modal-context';
import ModalManager from './modal-manager';
import { withMemoryStoreWrapperAndContext } from '../../utils/mock-component';


// Mock the CatalogCallModal component
vi.mock('./catalog-modals/catalog-call-modal', () => ({
  default: vi.fn(() => (
    <div>
      Catalog Call Modal Content
    </div>)),
}));

// Mock the useModalContext hook
vi.mock('../../hooks/modal-context', () => ({
  useModalContext: vi.fn(),
}));

describe('ModalManager', () => {
  it('renders null when modal is null', () => {
    (useModalContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ modal: null });
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<ModalManager />, {});
    render(wrappedComponent);
    expect(screen.queryByText(/Catalog Call Modal Content/i)).not.toBeInTheDocument();
  });

  it('renders CartFailureOrderModal when modal is CartFailureOrderModal', () => {
    (useModalContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ modal: 'CartFailureOrderModal' });
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<ModalManager />, {});
    render(wrappedComponent);
    // Добавляем отладочную строку
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });

  it('renders null when modal is an unknown type', () => {
    (useModalContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ modal: 'UnknownModal' });
    const { wrappedComponent } = withMemoryStoreWrapperAndContext(<ModalManager />, {});
    render(wrappedComponent);
    expect(screen.queryByText(/Catalog Call Modal Content/i)).not.toBeInTheDocument();
  });
});
