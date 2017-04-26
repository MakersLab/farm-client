import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import ControllButton from '../ControllButton';
import H1 from '../h1';
import FileUploadModal from '../fileUploadModal';
import PrinterActionConfirmModal from '../confirmModal';
import style from './style.css';
import api from '../../lib/api';

class ControllBar extends React.Component {
  constructor(props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
    this.getConfirmModalSettings = this.getConfirmModalSettings.bind(this);
  }

  makeRequest(command) {
    api.sendRequest(`/api/${command}`,'post',{selectedPrinters:this.props.selectedPrinters})
    .then((response) => {
      console.log(response);
    });
  }

  onLoadButtonClick() {
    this.props.setFileUploadModal(true);
  }

  uploadFile(file) {
    this.props.setFileUploadState(true);
    api.sendFile('/api/load', 'post', file,{selectedPrinters:this.props.selectedPrinters})
    .then((text) => {
      this.props.setFileUploadState(false);
      this.props.setFileUploadModal(false);
    });
  }

  getConfirmModalSettings() {
    return {
      isOpen: this.props.confirmModalState,
      onYes: () => {
        this.makeRequest(this.props.confirmModalActionType.toLowerCase());
        this.props.setPrinterActionConfirmModalState(false);
      },
      onNo: () => {
        this.props.setPrinterActionConfirmModalState(false);
      },
      selectedPrinters: this.props.selectedPrinterNames,
    };
  }

  controllButtonClick(type) {
    if (!(this.props.fileUploadModal && this.props.confirmModalState)) {
      switch (type) {
      case 'PRINT': {
        this.props.setPrinterActionConfirmModalState(true, type);
        break;
      }
      case 'PAUSE': {
        this.props.setPrinterActionConfirmModalState(true, type);
        break;
      }
      case 'LOAD': {
        this.props.setFileUploadModal(true);
        break;
      }
      case 'RESUME': {
        this.props.setPrinterActionConfirmModalState(true, type);
        break;
      }
      default: {
        break;
      }
      }
    }
  }

  getConfirmModalText(type) {
    return `Confirm ${type.toUpperCase()} action`;
  }

  render() {
    const modalSettings = {
      isOpen: this.props.fileUploadModal,
      close: () => { this.props.setFileUploadModal(false); },
      confirm: (file) => { this.uploadFile(file); },
      isUploadingFile: this.props.isUploadingFile,
      selectedPrinters: this.props.selectedPrinterNames,
    };
    const disabled = this.props.selectedPrinters.length <= 0;
    return (
      <div>
        <div className={style.controllBarPlaceholder} style={{height: '100px'}}></div>
        <div className={style.controllBar}>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('PRINT'); }}>print</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('LOAD'); }}>load</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('PAUSE'); }}>pause</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('RESUME'); }}>resume</ControllButton>
          <FileUploadModal {...modalSettings} />
          <PrinterActionConfirmModal {...this.getConfirmModalSettings()}>{this.getConfirmModalText(this.props.confirmModalActionType)}</PrinterActionConfirmModal>
        </div>
      </div>);
  }
}

export default ControllBar;
