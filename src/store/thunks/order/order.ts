import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Endpoint } from '../../../const';
import { Order } from '../../../types/order';

// Интерфейс для данных заказа
interface PostOrderProps {
  body: Order;
}

const postOrder = createAsyncThunk<void, PostOrderProps, { extra: AxiosInstance }>(
  'orders/post',
  async ({ body }, { extra: api }) => {
    // Отправляем на "ручку" данные заказа
    const response = await api.post<void>(`${Endpoint.Orders}`, body);
    return response.data;
  }
);

export const ordersThunk = { postOrder };
