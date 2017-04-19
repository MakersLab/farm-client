import { connect } from 'react-redux';

import ControllBar from '../components/controllBar';

const mapStateToProps = state => ({
  selectedPrinters: state.printer.selectedPrinters,
});

const mapDispatchToProps = dispatch => ({

});

const MainView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControllBar);

export default MainView;
