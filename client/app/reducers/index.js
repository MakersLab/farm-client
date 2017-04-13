import { combineReducers } from 'redux';

import appReducer from './app';
import mainView from './mainView';

const reducer = combineReducers({
  app: appReducer,
  printer: mainView,
});

export default reducer;
