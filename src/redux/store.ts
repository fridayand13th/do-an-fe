import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer, // Your root reducer
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the typed `useAppDispatch` hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
