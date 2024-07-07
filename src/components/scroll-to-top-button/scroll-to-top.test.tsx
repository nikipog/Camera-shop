import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTopButton from './scroll-to-top-button';

describe('ScrollToTopButton', () => {
  beforeAll(() => {
    // Мокаем метод window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    });
  });

  it('renders correctly', () => {
    render(<ScrollToTopButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls scrollToTop on button click', () => {
    render(<ScrollToTopButton />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
