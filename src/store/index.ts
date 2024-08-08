import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
