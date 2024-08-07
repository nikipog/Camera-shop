import { MemoryRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore, MockStoreEnhanced } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { createApi } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './mocks';
import { ModalProvider } from '../context/modal-context';
import { SelectedProductProvider } from '../context/selected-product-context';

type ComponentWithProviders = {
  wrappedComponent: ReactElement;
  mockStore: MockStoreEnhanced<Partial<State>, Action<string>>;
  mockAxiosAdapter: MockAdapter;
}

export function withMemoryAndStoreWrapper(
  component: ReactElement,
  initialState: Partial<State> = {}
): ComponentWithProviders {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<Partial<State>, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    wrappedComponent: (
      <Provider store={mockStore}>
        <MemoryRouter>
          <HelmetProvider>
            {component}
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    ),
    mockStore,
    mockAxiosAdapter,
  };
}
export function withMemoryStoreWrapperAndContext(
  component: ReactElement,
  initialState: Partial<State> = {}
): ComponentWithProviders {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<Partial<State>, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    wrappedComponent: (
      <Provider store={mockStore}>
        <MemoryRouter>
          <HelmetProvider>
            <ModalProvider>
              <SelectedProductProvider>
                {component}
              </SelectedProductProvider>
            </ModalProvider>
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    ),
    mockStore,
    mockAxiosAdapter,
  };
}
