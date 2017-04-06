import { connect } from 'react-redux';

import PrinterListComponent from '../components/printerList';

const mapStateToProps = state => ({
  printers: state.printer.printers,
});

const mapDispatchToProps = state => ({

});

const PrinterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrinterListComponent);

export default PrinterList;
