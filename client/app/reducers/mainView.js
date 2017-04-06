import * as printerState from '../constants/printer';
import printer from '../lib/createPrinter';

const initialAppState = {
  printers: [
    printer.createPrinter('Wonka', printerState.IDLE),
    printer.createPrinter('Satoshi', printerState.PRINTING),
    printer.createPrinter('Wonka', printerState.PAUSED),
    printer.createPrinter('Willy', printerState.FINISHED),
  ],
};

const mainViewReducer = (state = initialAppState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default mainViewReducer;
