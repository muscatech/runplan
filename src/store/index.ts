import { configureStore } from '@reduxjs/toolkit';

import { plansReducer } from '../modules/plan';
import { reducer as dialogsReducer } from '../modules/dialogs';
import { reducer as itemTypesReducer } from '../modules/itemTypes';

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    itemTypes: itemTypesReducer,
    plans: plansReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
