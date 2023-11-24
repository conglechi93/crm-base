import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import {useMemo} from 'react';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {configureStore} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ...reducers,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type AppDispatch = typeof store.dispatch;

function initStore(initialState?: AppState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}

export const initializeStore = (preloadedState) => {
  let _store = initStore(preloadedState);

  if (preloadedState) {
    _store = initStore({
      ...preloadedState,
    });
  }

  return _store;
};

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
