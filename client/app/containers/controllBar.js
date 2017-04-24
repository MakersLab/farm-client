import { connect } from 'react-redux';

import ControllBar from '../components/controllBar';
import { setFileUploadModal, setFileUploadState } from '../actions/mainView';

const mapStateToProps = state => ({
  selectedPrinters: state.printer.selectedPrinters,
  fileUploadModal: state.printer.fileUploadModal,
  isUploadingFile: state.printer.isUploadingFile,
});

const mapDispatchToProps = dispatch => ({
  setFileUploadModal: (state) => { dispatch(setFileUploadModal(state)); },
  setFileUploadState: (state) => { dispatch(setFileUploadState(state)); },
});

const MainView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControllBar);

export default MainView;
