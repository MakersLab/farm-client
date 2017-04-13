
export const PRINTER_ADD = 'PRINTER_ADD';
export const PRINTER_UPDATE_STATE = 'PRINTER_UPDATE_STATE';

export const addPrinter = (printer, id) => ({
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
