import * as printerState from '../constants/printer';
import printer from '../lib/createPrinter';
import _ from 'lodash';

import { PRINTER_ADD, PRINTER_UPDATE_STATE } from '../actions/mainView';

const initialAppState = {
  printers: {},
};

const mainViewReducer = (state = initialAppState, action) => {
  switch (action.type) {
  case PRINTER_ADD: {
    let newState = _.cloneDeep(state);
    newState.printers[action.id] = (printer.createPrinter(action.printer, printerState.PRINTING))
    return newState;
  }
  case PRINTER_UPDATE_STATE: {
    let newState = _.cloneDeep(state);
    console.log(action.data);
    _.forEach(action.data.data, (currentPrinterState, printerId)=>{
      console.log('this');
      if(newState.printers[printerId]){
        newState.printers[printerId] = Object.assign(newState.printers[printerId], currentPrinterState);
      }
    });
    return newState;
  }
  default:
    return state;
  }
};

export default mainViewReducer;
