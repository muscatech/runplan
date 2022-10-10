import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import { plansReducer } from '../modules/plan';
import { reducer as dialogsReducer } from '../modules/dialogs';
import { reducer as importReducer } from '../modules/import';
import { reducer as itemTypesReducer } from '../modules/itemTypes';
import { rolesReducer } from '../modules/roles';
import { PlanningCenterAPI } from '../modules/import';

const persistConfig = {
  blacklist: [
    PlanningCenterAPI.reducerPath
  ],
  key: 'runplan',
  storage,
};

const combinedReducer = combineReducers({
  dialogs: dialogsReducer,
  import: importReducer,
  itemTypes: itemTypesReducer,
  plans: plansReducer,
  roles: rolesReducer,
  [PlanningCenterAPI.reducerPath]: PlanningCenterAPI.reducer
});

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combinedReducer
  ),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(PlanningCenterAPI.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
