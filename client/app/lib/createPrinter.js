import * as printerConstants from '../constants/printer';

const createPrinter = (name, state, link) => {
  return {
    name,
    state,
    progress: 0,
    link,
    selected: false,
  };
};

export default {
  createPrinter,
};
