import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { cloneDeep } from 'lodash';

import ControllButton from '../ControllButton';
import H1 from '../h1';
import FileUploadModal from '../fileUploadModal';
import PrinterActionConfirmModal from '../confirmModal';
import PreheatModal from '../preheatModal';
import style from './style.css';
import api from '../../lib/api';

class ControllBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        preheat: {
          tool: 0,
          bed: 0,
        },
      },
    };
    this.makeRequest = this.makeRequest.bind(this);
    this.getConfirmModalSettings = this.getConfirmModalSettings.bind(this);
  }

  makeRequest(command, body = {}) {
    body.selectedPrinters = this.props.selectedPrinters;
    api.sendRequest(`/api/${command}`, 'post', body)
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
      isOpen: this.props.confirmModalActionType != 'PREHEAT' ? this.props.confirmModalState : false,
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

  getPreheatModalSettings() {
    return {
      isOpen: this.props.confirmModalActionType == 'PREHEAT' ? this.props.confirmModalState : false,
      close: () => {
        this.props.setPrinterActionConfirmModalState(false);
      },
      confirm: () => {
        const body = {
          tool: this.state.modal.preheat.tool,
          bed: this.state.modal.preheat.bed,
        }
        this.makeRequest(this.props.confirmModalActionType.toLowerCase(), body);
        this.props.setPrinterActionConfirmModalState(false);
      },
      toolInputChange: (event) => {
        const newState = cloneDeep(this.state);
        newState.modal.preheat.tool = event.target.value;
        this.setState(newState)
      },
      bedInputChange: (event) => {
        const newState = cloneDeep(this.state);
        newState.modal.preheat.bed = event.target.value;
        this.setState(newState)
      },
      onPresetClick: (body) => {
        this.makeRequest(this.props.confirmModalActionType.toLowerCase(), body);
        this.props.setPrinterActionConfirmModalState(false);
      },
      toolInputValue: this.state.modal.preheat.tool,
      bedInputValue: this.state.modal.preheat.bed,
      selectedPrinters: this.props.selectedPrinterNames,
      temperaturePresets: this.props.temperaturePresets,
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
      case 'CANCEL': {
        this.props.setPrinterActionConfirmModalState(true, type);
        break;
      }
      case 'PREHEAT': {
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
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('LOAD'); }}>upload</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('PAUSE'); }}>pause</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('RESUME'); }}>resume</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('CANCEL'); }}>cancel</ControllButton>
          <ControllButton disabled={disabled} onClick={() => { this.controllButtonClick('PREHEAT'); }}>preheat</ControllButton>
          <ControllButton onClick={() => { this.props.settingsActive(true); }}>settings</ControllButton>
          <FileUploadModal {...modalSettings} />
          <PrinterActionConfirmModal {...this.getConfirmModalSettings()}>{this.getConfirmModalText(this.props.confirmModalActionType)}</PrinterActionConfirmModal>
          <PreheatModal {...this.getPreheatModalSettings()}>Preheat</PreheatModal>
        </div>
      </div>);
  }
}

export default ControllBar;
