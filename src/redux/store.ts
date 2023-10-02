import { configureStore } from '@reduxjs/toolkit';
import switchDataReducer from './switchDataSlice';

export const store = configureStore({
  reducer: {
    switchData: switchDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
