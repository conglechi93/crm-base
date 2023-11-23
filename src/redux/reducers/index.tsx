import Settings from './Setting';
import Common from './Common';
import appReducer from './App';
import Auth from './Auth';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [''],
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated'],
};

const reducers = {
  auth: persistReducer(authPersistConfig, Auth),
  settings: Settings,
  common: Common,
  app: appReducer,
};

export default reducers;
