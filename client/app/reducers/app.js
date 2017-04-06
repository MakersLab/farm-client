import { TEST } from '../actions/app';

const initialAppState = {
  text: 'hello',
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
  case TEST:
    return Object.assign({}, state, {
      text: action.text,
    });
  default:
    return state;
  }
};

export default appReducer;
