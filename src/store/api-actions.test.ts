import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AppThunkDispatch, MOCK_ORDER, MOCK_PRODUCT, MOCK_REVIEWS, PRODUCT_MOCK_ID, extractActionsTypes, mockProducts } from '../utils/mocks';
import { State } from '../types/state';
import { Endpoint, HttpResponseStatusCodes } from '../const';
import { fetchAllProducts, fetchProduct } from './thunks/products/products';
import { fetchReviews } from './thunks/reviews/reviews';
import { ordersThunk } from './thunks/order/order';


describe('Async action', () => {
  const axios = createApi();

  // когда будем выполнять запросы с помощью экземляра эксиос (выше),
  // они не будут отправляться на сервер, благодаря адаптеру (ниже)

  const mockAxiosAdapter = new MockAdapter(axios);

  // имитируем конфигурирование хранилища, мокаем стор
  // сначала соберём middleware (должны передаваться в виде массива)

  const middleware = [thunk.withExtraArgument(axios)];

  // имитируем легковесное хранилище с помощью jedmao redux-mock-store (можно создавать сколько угодно хранилищ)
  // аргументом передаем middleware. Таким образом, получаем функцию, которая позволяет имплементировать стор

  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  // заведём переменную store и её типом будет являться тип, который возвращает функция mockStoreCreator
  // хэлпер-тип ReturnType позволяет вывести тип и получить его на основании возвращаемого значения функции

  let store: ReturnType<typeof mockStoreCreator>;

  // чтобы исключить побочные эффекты, перед выполнением каждого теста надо пересоздавать store
  // vitest предлагает методы жизненного цикла (хуки), с их помощью можно выполнять код в определенных ситуациях
  // например beforeeach - выполняется перед каждым тестом

  beforeEach(() => {
    // передаём коллбек-функцию mSC, аргументом передаем структуру store
    store = mockStoreCreator({ products: { products: [] }, product: {product: null} });
  });
  // для каждого асинхронного действия делаем отдельную группу describe
  describe('fetchAllProductsAction', () => {
    it('should dispatch "fetchProductsAction.pending", "fetchProductsAction.fulfilled", when server response 200', async () => {
      // на запрос по адресу .. ответ должен быть 200 и вернуть массив моковых продуктов
      mockAxiosAdapter.onGet(Endpoint.Cameras).reply(HttpResponseStatusCodes.SuccessfulResponse, mockProducts);
      await store.dispatch(fetchAllProducts());

      // постподготовка - извлекаем переменные для удобного сравнения
      // получаем выполненные (заимиченные, задиспатченные) действия

      const emittedActions = store.getActions();
      // извлекаем информацию ТОЛЬКО О ТИПЕ дейсвтия с помощью спец. функции
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      // теперь надо убедиться, что в первом действии у нас находястя данные, которые возникают в случае имитации
      // в emActions есть объекты где есть type и payload, извлекаем его и его тип равен тому, что возвращает фетч продуктов фулфилд
      // после этого мы можем обратиться к полезной нагрузке
      // обращаемся не у нулевому,а первому элементу по индексу, так как первым объектом является pending

      const fetchAllProductsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchAllProducts.fulfilled>;

      // стадия проверки. убеждаемся что извлеченные типы соответствуют массиву типов fetch.pending/fulfilled
      expect(extractedActionsTypes).toEqual([
        fetchAllProducts.pending.type,
        fetchAllProducts.fulfilled.type
      ]);
      // теперь надо убедиться что в payload лежит массив моковых данных
      expect(fetchAllProductsFulfilled.payload)
        .toEqual(mockProducts);
    });
    it ('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(Endpoint.Cameras).reply(HttpResponseStatusCodes.ClientErrorResponse, []);

      await store.dispatch(fetchAllProducts());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAllProducts.pending.type,
        fetchAllProducts.rejected.type
      ]);
    });

  });

  describe('fetchProductAction', () => {
    it('should dispatch "fetchProductAction.pending", "fetchProductAction.fulfilled", when server response 200', async () => {

      mockAxiosAdapter.onGet(`${Endpoint.Cameras}/${PRODUCT_MOCK_ID}`).reply(HttpResponseStatusCodes.SuccessfulResponse, MOCK_PRODUCT);
      await store.dispatch(fetchProduct(PRODUCT_MOCK_ID.toString()));

      const emittedActions = store.getActions();

      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchProductFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProduct.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProduct.pending.type,
        fetchProduct.fulfilled.type
      ]);

      expect(fetchProductFulfilled.payload)
        .toEqual(MOCK_PRODUCT);
    });
    it ('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(Endpoint.Cameras).reply(HttpResponseStatusCodes.ClientErrorResponse, []);

      await store.dispatch(fetchAllProducts());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAllProducts.pending.type,
        fetchAllProducts.rejected.type
      ]);
    });

  });

  describe('fetchReviews', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {

      mockAxiosAdapter.onGet(`${Endpoint.Cameras}/${PRODUCT_MOCK_ID}/reviews`).reply(HttpResponseStatusCodes.SuccessfulResponse, MOCK_REVIEWS);

      await store.dispatch(fetchReviews(PRODUCT_MOCK_ID));


      const emittedActions = store.getActions();

      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type
      ]);
      // теперь надо убедиться что в payload лежит массив моковых данных
      expect(fetchReviewsFulfilled.payload)
        .toEqual(MOCK_REVIEWS);
    });
    it ('should dispatch "fetchProductsAction.pending", "fetchProductsAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${Endpoint.Cameras}/${PRODUCT_MOCK_ID}/reviews`).reply(HttpResponseStatusCodes.ClientErrorResponse, []);

      await store.dispatch(fetchReviews(PRODUCT_MOCK_ID));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type
      ]);
    });

  });

  describe('postOrder', () => {
    it('should dispatch "postOrderAction.pending", "postOrderAction.fulfilled", when server response 201', async () => {

      mockAxiosAdapter.onPost(`${Endpoint.Orders}`).reply(HttpResponseStatusCodes.SuccessfulResponse, MOCK_ORDER);

      await store.dispatch(ordersThunk.postOrder({
        body: MOCK_ORDER
      }));


      const emittedActions = store.getActions();

      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const postOrderFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        ordersThunk.postOrder.pending.type,
        ordersThunk.postOrder.fulfilled.type
      ]);

      expect(postOrderFulfilled.payload)
        .toEqual(MOCK_ORDER);
    });
    it ('should dispatch "postOrderAction.pending", "postOrderAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onPost(`${Endpoint.Orders}`).reply(HttpResponseStatusCodes.ClientErrorResponse, []);

      await store.dispatch(ordersThunk.postOrder({
        body: MOCK_ORDER
      }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        ordersThunk.postOrder.pending.type,
        ordersThunk.postOrder.rejected.type
      ]);
    });

  });


});
