import React from 'react';
import Modal from 'react-modal';

import style from './style.css';
import modalStyle from '../fileUploadModal/style.css';
import H1 from '../h1';
import ControllButton from '../controllButton';
import SelectedPrinters from '../selectedPrinters';
import TemperatureInput from '../temperatureInput';

const PreheatModal = ({ isOpen, children, close, confirm, selectedPrinters, toolInputChange, bedInputChange, toolInputValue, bedInputValue }) => (
  <Modal
    isOpen={isOpen}
    className={modalStyle.modal}
    overlayClassName={modalStyle.modalOverlay}
    onRequestClose={close}
  >
    <H1>{children}</H1>
    <SelectedPrinters selectedPrinters={selectedPrinters} />
    <TemperatureInput onChange={toolInputChange} value={toolInputValue}>Tool</TemperatureInput>
    <TemperatureInput onChange={bedInputChange} value={bedInputValue}>Bed</TemperatureInput>
    <ControllButton onClick={close}>Cancel</ControllButton>
    <ControllButton onClick={confirm}>Confirm</ControllButton>
  </Modal>
);

export default PreheatModal;
