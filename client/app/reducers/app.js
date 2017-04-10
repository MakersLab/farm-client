import { APP_TEST } from '../actions/app';

const initialAppState = {
  text: 'hello',
  config: {
    loading: true,
  }
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
  case APP_TEST:
    console.log('test reducer');
    return Object.assign({}, state, {
      text: action.text,
    });
  default:
    return state;
  }
};

export default appReducer;
