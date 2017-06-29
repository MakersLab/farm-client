import { connect } from 'react-redux';
import { map } from 'lodash';

import ControllBar from '../components/controllBar';
import { setFileUploadModal, setFileUploadState, setPrinterActionConfirmModalState } from '../actions/mainView';
import { settingsActive } from '../actions/settings';

function selectedPrintersNames(printers, selectedPrinters) {
  return map(selectedPrinters, (value) => {
    return printers[value].name;
  });
}

const mapStateToProps = state => ({
  selectedPrinters: state.printer.selectedPrinters,
  selectedPrinterNames: selectedPrintersNames(state.printer.printers, state.printer.selectedPrinters),
  fileUploadModal: state.printer.fileUploadModal,
  isUploadingFile: state.printer.isUploadingFile,
  confirmModalState: state.printer.printerConfirmModal.state,
  confirmModalActionType: state.printer.printerConfirmModal.actionType,
  temperaturePresets: state.printer.temperaturePresets,
});

const mapDispatchToProps = dispatch => ({
  setFileUploadModal: (state) => { dispatch(setFileUploadModal(state)); },
  setFileUploadState: (state) => { dispatch(setFileUploadState(state)); },
  setPrinterActionConfirmModalState: (state, action = false) => {
    dispatch(setPrinterActionConfirmModalState(state, action));
  },
  settingsActive: (state) => { dispatch(settingsActive(state)); },
});

const MainView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControllBar);

export default MainView;
