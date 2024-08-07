import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render 404 Not Found message', () => {
    const message = screen.getByText('404 Not Found');
    expect(message).toBeInTheDocument();
  });

  it('should render a link to the catalog page', () => {
    const link = screen.getByRole('link', { name: /click here/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

});
