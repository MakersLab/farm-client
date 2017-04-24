import { cloneDeep, forEach } from 'lodash';
import printer from '../lib/createPrinter';

import { PRINTER_ADD,
  PRINTER_UPDATE_STATE,
  PRINTER_TOGGLE,
  FILE_UPLOAD_MODAL_TOGGLE,
  SET_FILE_UPLOAD_STATE,
 } from '../actions/mainView';

const initialAppState = {
  printers: {},
  selectedPrinters: [],
  fileUploadModal: false,
  isUploadingFile: false,
};

const mainViewReducer = (state = initialAppState, action) => {
  switch (action.type) {

  case PRINTER_ADD: {
    const newState = cloneDeep(state);
    newState.printers[action.id] = (
      printer.createPrinter(action.printer, 'Loading', action.link));
    return newState;
  }

  case PRINTER_UPDATE_STATE: {
    const newState = cloneDeep(state);
    forEach(action.data.data, (currentPrinterState, printerId) => {
      if (newState.printers[printerId]) {
        newState.printers[printerId] = Object.assign(
          newState.printers[printerId], currentPrinterState);
      }
    });
    newState.lastUpdated = action.data.timestamp;
    return newState;
  }

  case PRINTER_TOGGLE: {
    const newState = cloneDeep(state);
    if (newState.selectedPrinters.length > 0 && newState.selectedPrinters.indexOf(action.printer) >= 0) {
      newState.selectedPrinters.splice(newState.selectedPrinters.indexOf(action.printer), 1);
    } else {
      newState.selectedPrinters.push(action.printer);
    }
    newState.printers[action.printer].selected = !newState.printers[action.printer].selected;
    return newState;
  }

  case FILE_UPLOAD_MODAL_TOGGLE: {
    const newState = cloneDeep(state);
    newState.fileUploadModal = action.state;
    return newState;
  }

  case SET_FILE_UPLOAD_STATE: {
    const newState = cloneDeep(state);
    newState.isUploadingFile = action.state;
    return newState;
  }

  default:
    return state;
  }
};

export default mainViewReducer;
