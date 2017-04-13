
export const PRINTER_ADD = 'PRINTER_ADD';
export const PRINTER_UPDATE_STATE = 'PRINTER_UPDATE_STATE';
export const PRINTER_TOGGLE = 'PRINTER_TOGGLE';

export const PRINTER_PRINT = 'PRINTER_PRINT';
export const PRINTER_TOGGLE_PAUSE = 'PRINTER_TOGGLE_PAUSE';
export const PRINTER_LOAD = 'PRINTER_LOAD';
export const PRINTER_STOP = 'PRINTER_STOP';

export const PRINTER_REQUEST_COMPLETED = 'PRINTER_REQUEST_COMPLETED';

export const addPrinter = (printer, id, link) => ({
  type: PRINTER_ADD,
  printer,
  id,
  link,
});

export const updatePrinterState = data => ({
  type: PRINTER_UPDATE_STATE,
  data,
});

export const printerToggle = printer => ({
  type: PRINTER_TOGGLE,
  printer,
});

// export const print =
