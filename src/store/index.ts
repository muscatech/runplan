import { combineReducers, configureStore } from '@reduxjs/toolkit';

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
import { reducer as itemTypesReducer } from '../modules/itemTypes';

const persistConfig = {
  blacklist: [
    'dialogs'
  ],
  key: 'runplan',
  storage,
};

const combinedReducer = combineReducers({
  dialogs: dialogsReducer,
  itemTypes: itemTypesReducer,
  plans: plansReducer
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
  }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
