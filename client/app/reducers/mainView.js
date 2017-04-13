import printer from '../lib/createPrinter';
import _ from 'lodash';

import { PRINTER_ADD, PRINTER_UPDATE_STATE, PRINTER_TOGGLE } from '../actions/mainView';

const initialAppState = {
  printers: {},
  selectedPrinters: [],
};

const mainViewReducer = (state = initialAppState, action) => {
  switch (action.type) {
  case PRINTER_ADD: {
    const newState = _.cloneDeep(state);
    newState.printers[action.id] = (
      printer.createPrinter(action.printer, 'Loading', action.link));
    return newState;
  }
  case PRINTER_UPDATE_STATE: {
    const newState = _.cloneDeep(state);
    _.forEach(action.data.data, (currentPrinterState, printerId) => {
      if (newState.printers[printerId]) {
        newState.printers[printerId] = Object.assign(
          newState.printers[printerId], currentPrinterState);
      }
    });
    return newState;
  }
  case PRINTER_TOGGLE: {
    const newState = _.cloneDeep(state);
    if (newState.selectedPrinters.length > 0 && newState.selectedPrinters.indexOf(action.printer) >= 0) {
      newState.selectedPrinters.splice(newState.selectedPrinters.indexOf(action.printer), 1);
    } else {
      newState.selectedPrinters.push(action.printer);
    }
    newState.printers[action.printer].selected = !newState.printers[action.printer].selected;
    return newState;
  }
  default:
    return state;
  }
};

export default mainViewReducer;
