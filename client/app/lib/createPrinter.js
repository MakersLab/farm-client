import * as printerConstants from '../constants/printer';

const createPrinter = (name, state) => {
  let specificInfo;
  switch (state) {
  case printerConstants.IDLE:
    specificInfo = {
      nozzleTemperature: 0,
      bedTemperature: 0,
    };
    break;
  case printerConstants.PRINTING:
    specificInfo = {
      nozzleTemperature: 50,
      bedTemperature: 60,
      progress: 50,
      fileName: 'Vase.gcode',
      timePrinting: '16 minutes',
      timeRemaining: '1 hour 20 minutes',
    };
    break;
  case printerConstants.PAUSED:
    specificInfo = {
      nozzleTemperature: 50,
      bedTemperature: 60,
      progress: 75,
      fileName: 'Vase.gcode',
      timePrinting: '16 minutes',
      timeRemaining: 'unknown',
    };
    break;
  case printerConstants.FINISHED:
    specificInfo = {
      nozzleTemperature: 40,
      bedTemperature: 30,
      progress: 100,
      fileName: 'Vase.gcode',
      timePrinting: '1 hour 36 minutes',
      timeRemaining: '0',
    };
    break;
  default:
    specificInfo = {};
  }

  return {
    name,
    state,
    ...specificInfo,
  };
};

export default {
  createPrinter,
};
