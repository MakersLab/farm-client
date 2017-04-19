import { connect } from 'react-redux';

import PrinterListComponent from '../components/printerList';
import { printerToggle } from '../actions/mainView';

const mapStateToProps = state => ({
  printers: state.printer.printers,
});

const mapDispatchToProps = dispatch => ({
  toggleSelected: (printer) => {
    dispatch(printerToggle(printer));
  },
});

const PrinterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrinterListComponent);

export default PrinterList;
