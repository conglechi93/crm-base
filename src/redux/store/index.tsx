import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import {useMemo} from 'react';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

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
