import { configureStore } from '@reduxjs/toolkit';
import { registerSlice } from '../store/registerSlice';
import heroSlice from '../store/heroSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    register: registerSlice.reducer, 
    hero : heroSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;