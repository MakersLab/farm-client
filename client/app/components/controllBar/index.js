import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import ControllButton from '../ControllButton';
import H1 from '../h1';
import FileUploadModal from '../fileUploadModal';
import style from './style.css';
import api from '../../lib/api';

class ControllBar extends React.Component {
  constructor(props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
    this.onPrintButtonClick = this.onPrintButtonClick.bind(this);
    this.onPauseButtonClick = this.onPauseButtonClick.bind(this);
    this.onLoadButtonClick = this.onLoadButtonClick.bind(this);
    this.onResumeButtonClick = this.onResumeButtonClick.bind(this);
  }

  makeRequest(command) {
    api.sendRequest(`/api/${command}`,'post',{selectedPrinters:this.props.selectedPrinters})
    .then((response) => {
      console.log(response);
    });
  }

  onPrintButtonClick() {
    this.makeRequest('print');
  }

  onPauseButtonClick() {
    this.makeRequest('pause');
  }
  onLoadButtonClick() {
    this.props.setFileUploadModal(true);
  }

  uploadFile(file) {
    this.props.setFileUploadState(true);
    api.sendFile('/api/load', 'post', file)
    .then((text) => {
      this.props.setFileUploadState(false);
      this.props.setFileUploadModal(false);
    });
  }

  onResumeButtonClick() {
    this.makeRequest('resume');
  }

  render() {
    const modalSettings = {
      isOpen: this.props.fileUploadModal,
      close: () => { this.props.setFileUploadModal(false); },
      confirm: (file) => { this.uploadFile(file); },
      isUploadingFile: this.props.isUploadingFile,
    };
    console.log(this.props.isUploadingFile);

    const disabled = this.props.selectedPrinters.length <= 0;
    return (
      <div className={style.controllBar}>
        <ControllButton disabled={disabled} onClick={() => { this.onPrintButtonClick(); }}>print</ControllButton>
        <ControllButton disabled={disabled} onClick={this.onPauseButtonClick}>pause</ControllButton>
        <ControllButton disabled={disabled} onClick={this.onLoadButtonClick}>load</ControllButton>
        <ControllButton disabled={disabled} onClick={this.onResumeButtonClick}>resume</ControllButton>
        <FileUploadModal {...modalSettings} />
      </div>);
  }
}

export default ControllBar;
