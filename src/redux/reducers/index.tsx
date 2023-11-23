import Settings from './Setting';
import Common from './Common';
import appReducer from './App';

const reducers = {
  settings: Settings,
  common: Common,
  app: appReducer,
};

export default reducers;
