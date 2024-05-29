import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks/store';
import { useEffect } from 'react';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, ToastifyMessages } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../layout/layout';
import { productsActions } from '../../store/slices/products';
import { ToastContainer, toast } from 'react-toastify';
import { ModalProvider } from '../../context/modal-context';
import ModalManager from '../modals/modal-manager';
import { SelectedProductProvider } from '../../context/selected-product-context';

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchAllProducts())
      .unwrap()
      .catch(() => {
        toast.error(ToastifyMessages.FetchProductsError);
      });
  }, [dispatch]);

  return (
    <HelmetProvider>
      <ToastContainer />
      <ModalProvider>
        <SelectedProductProvider>
          <ModalManager />
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
                <Route
                  path={AppRoute.Product}
                  element={<ProductPage />}
                />
              </Route>


              <Route
                path='*'
                element={<NotFoundPage />}
              />

            </Routes>
          </BrowserRouter>
        </SelectedProductProvider>
      </ModalProvider>
    </HelmetProvider >
  );
}

export default App;
