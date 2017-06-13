
export const PRINTER_ADD = 'PRINTER_ADD';
export const PRINTER_UPDATE_STATE = 'PRINTER_UPDATE_STATE';
export const PRINTER_TOGGLE = 'PRINTER_TOGGLE';

export const PRINTER_PRINT = 'PRINTER_PRINT';
export const PRINTER_TOGGLE_PAUSE = 'PRINTER_TOGGLE_PAUSE';
export const PRINTER_LOAD = 'PRINTER_LOAD';
export const PRINTER_STOP = 'PRINTER_STOP';

export const PRINTER_REQUEST_COMPLETED = 'PRINTER_REQUEST_COMPLETED';

export const FILE_UPLOAD_MODAL_TOGGLE = 'FILE_UPLOAD_MODAL_TOGGLE';
export const SET_FILE_UPLOAD_STATE = 'SET_FILE_UPLOAD_STATE';

export const PRINTER_CONFIRM_MODAL = 'PRINTER_CONFIRM_MODAL';

export const SET_PRINTER_GRID = 'SET_PRINTER_GRID';

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

export const setFileUploadModal = state => ({
  type: FILE_UPLOAD_MODAL_TOGGLE,
  state,
});

export const setFileUploadState = state => ({
  type: SET_FILE_UPLOAD_STATE,
  state,
});

export const setPrinterActionConfirmModalState = (state, actionType) => {
  const action = {
    type: PRINTER_CONFIRM_MODAL,
    state,
  };
  if (state) {
    action.actionType = actionType;
  }
  return action;
};

export const setPrinterGrid = grid => ({
  type: SET_PRINTER_GRID,
  grid,
});
