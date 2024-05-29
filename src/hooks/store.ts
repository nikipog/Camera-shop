import { AxiosInstance } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../types/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: AxiosInstance;
}>();


export { useAppDispatch, useAppSelector, createAppAsyncThunk };


