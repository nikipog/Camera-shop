import type { Product } from '../../types/product';
import { Endpoint } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';


const fetchAllProducts = createAppAsyncThunk<Product[], undefined>
('fetchProducts/all', async (_arg, {extra: api}) => {
  const response = await api.get<Product[]>(`${Endpoint.Cameras}`);
  return response.data;
});

const fetchProduct = createAppAsyncThunk<Product, string>
('fetchProducts/one', async (productID, {extra: api}) => {
  const response = await api.get<Product>(`${Endpoint.Cameras}/${productID}`);
  return response.data;
});


export {fetchAllProducts , fetchProduct};
