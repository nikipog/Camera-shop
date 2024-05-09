import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Catalog}
            element={<Layout />}
          >
            <Route
              path={AppRoute.Catalog}
              element={<CatalogPage />}
            />
          </Route>

          <Route
            path='*'
            element={<NotFoundPage />}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
