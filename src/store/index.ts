import { configureStore } from '@reduxjs/toolkit';

import { plansReducer } from '../modules/plan';
import { reducer as dialogsReducer } from '../modules/dialogs';

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    plans: plansReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
