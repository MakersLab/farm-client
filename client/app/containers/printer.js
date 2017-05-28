import { connect } from 'react-redux';

import PrinterListComponent from '../components/printerList';
import { printerToggle, setFileUploadState } from '../actions/mainView';

const mapStateToProps = state => ({
  printers: state.printer.printers,
  updated: state.printer.lastUpdated,
  selectedPrinters: state.printer.selectedPrinters,
});

const mapDispatchToProps = dispatch => ({
  toggleSelected: (printer) => {
    dispatch(printerToggle(printer));
  },
  setFileUploadState: (state) => { dispatch(setFileUploadState(state)); },
});

const PrinterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrinterListComponent);

export default PrinterList;
