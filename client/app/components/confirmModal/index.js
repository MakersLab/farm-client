import React from 'react';
import style from './style.css';
import modalStyle from '../fileUploadModal/style.css';
import Modal from 'react-modal';

import H1 from '../h1';
import ControllButton from '../controllButton';
import SelectedPrinters from '../selectedPrinters';

const PrinterActionConfirmModal = ({ isOpen, onYes, onNo, children, selectedPrinters }) => (
  <Modal
    isOpen={isOpen}
    className={modalStyle.modal}
    overlayClassName={modalStyle.modalOverlay}
    onRequestClose={onNo}
  >
    <H1>{children}</H1>
    <SelectedPrinters selectedPrinters={selectedPrinters} />
    <ControllButton onClick={onYes}>Yes</ControllButton>
    <ControllButton onClick={onNo}>No</ControllButton>
  </Modal>
)

export default PrinterActionConfirmModal;
