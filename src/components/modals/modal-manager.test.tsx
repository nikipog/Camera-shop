import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useModalContext } from '../../hooks/modal-context';
import ModalManager from './modal-manager';

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
    render(<ModalManager />);
    expect(screen.queryByText(/Catalog Call Modal Content/i)).not.toBeInTheDocument();
  });

  it('renders CatalogCallModal when modal is CatalogCallModal', () => {
    (useModalContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ modal: 'CatalogCallModal' });
    render(<ModalManager />);
    expect(screen.getByText(/Catalog Call Modal Content/i)).toBeInTheDocument();
  });

  it('renders null when modal is an unknown type', () => {
    (useModalContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ modal: 'UnknownModal' });
    render(<ModalManager />);
    expect(screen.queryByText(/Catalog Call Modal Content/i)).not.toBeInTheDocument();
  });
});
