import React from 'react';
import Modal from 'react-modal';

import modalStyle from '../fileUploadModal/style.css';
import style from './style.css';
import H1 from '../h1';
import H2 from '../h2';
import ControllButton from '../controllButton';
import Prompt from '../prompt';
import api from '../../lib/api';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.closeModal = this.closeModal.bind(this);
    this.shutdownAllPrinters = this.shutdownAllPrinters.bind(this);
    this.shutdownFarm = this.shutdownFarm.bind(this);
  }

  closeModal() {
    this.props.settingsActive(false);
  }

  shutdownAllPrinters() {
    this.props.settingsActionStart('Shutdown all printers ?', () => {
      console.log('request');
      const body = {
        selectedPrinters: this.props.printers
      };
      api.sendRequest('/api/system/shutdown/printers', 'post', body)
        .then(() => {
          this.props.settingsActionFinish();
        });
    });
  }

  shutdownFarm() {
    this.props.settingsActionStart('Shutdown farm ?', () => {
      console.log('request');
      api.sendRequest('/api/system/shutdown/farm', 'post')
        .then(() => {
          this.props.settingsActionFinish();
        });
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.active}
        className={`${modalStyle.modal} ${style.modal}`}
        overlayClassName={modalStyle.modalOverlay}
        onRequestClose={this.closeModal}
      >
        <H1>Settings</H1>
        <H2>system</H2>
        <ControllButton onClick={this.shutdownAllPrinters}>shutdown all printers</ControllButton>
        <ControllButton>shutdown whole farm</ControllButton>

        {this.props.prompt ? <Prompt
          isOpen
          confirm={this.props.prompt.onConfirm}
          reject={this.props.settingsActionFinish}>
            {this.props.prompt.message}
          </Prompt> : false}
      </Modal>);
  }
}

export default Settings;
