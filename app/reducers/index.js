import { combineReducers } from 'redux';

import appReducer from './app';
import mainView from './mainView';
import settingsReducer from './settings';

const reducer = combineReducers({
  app: appReducer,
  printer: mainView,
  settings: settingsReducer,
});

export default reducer;
