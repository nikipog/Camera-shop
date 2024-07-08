import { render, screen } from '@testing-library/react';
import App from './app';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../../store';

describe('App', () => {
  it('renders main elements and providers correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    );

    // Проверка наличия основного контента
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Проверка наличия каталога
    expect(screen.getByRole('heading', { name: /Каталог фото- и видеотехники/i })).toBeInTheDocument();
  });
});
