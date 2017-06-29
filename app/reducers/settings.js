import { cloneDeep } from 'lodash';

import { SETTINGS_ACTIVE, SETTINGS_ACTION_START, SETTINGS_ACTION_FINISHED } from '../actions/settings';

const initialAppState = {
  requestState: false,
  active: false,
  prompt: false,
  settings: {
  },
};

const settingsReducer = (state = initialAppState, action) => {
  switch (action.type) {
  case SETTINGS_ACTIVE: {
    const newState = cloneDeep(state);
    newState.active = action.state;
    return newState;
  }

  case SETTINGS_ACTION_START: {
    const newState = cloneDeep(state);
    newState.prompt = {};
    newState.prompt.message = action.message;
    newState.prompt.onConfirm = action.onConfirm;
    return newState;
  }

  case SETTINGS_ACTION_FINISHED: {
    const newState = cloneDeep(state);
    newState.prompt = false;
    return newState;
  }

  default: {
    return state;
  }
  }
};

export default settingsReducer;
