import Settings from './Setting';
import Common from './Common';
import appReducer from './App';
import Auth from './Auth';
import Category from './Categories';
import ShopInfo from './Shop';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [''],
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated'],
};

const categoriesPersistConfig = {
  key: 'category',
  storage,
  blacklist: [''],
  whitelist: ['categories', 'configurations', 'imageUrls'],
};

const reducers = {
  auth: persistReducer(authPersistConfig, Auth),
  settings: Settings,
  common: Common,
  app: appReducer,
  shop: ShopInfo,
  category: persistReducer(categoriesPersistConfig, Category),
};

export default reducers;
