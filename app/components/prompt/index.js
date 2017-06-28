import React from 'react';
import Modal from 'react-modal';

import H1 from '../h1';
import modalStyle from '../fileUploadModal/style.css';
import ControllButton from '../controllButton';

const Prompt = ({ children, isOpen, confirm, reject }) => (
  <Modal
  isOpen={isOpen}
  className={modalStyle.modal}
  overlayClassName={modalStyle.modalOverlay}
  onRequestClose={reject}
  >
    <H1>{children}</H1>
    <ControllButton onClick={confirm}>Yes</ControllButton>
    <ControllButton onClick={reject}>No</ControllButton>
  </Modal>
);

export default Prompt;
