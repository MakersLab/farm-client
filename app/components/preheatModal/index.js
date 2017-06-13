import React from 'react';
import Modal from 'react-modal';

import style from './style.css';
import modalStyle from '../fileUploadModal/style.css';
import H1 from '../h1';
import H2 from '../h2';
import ControllButton from '../controllButton';
import SelectedPrinters from '../selectedPrinters';
import TemperatureInput from '../temperatureInput';
import PreheatPresets from '../preheatPresets';
import preheatPresetsConfig from 'json-loader!yaml-loader!./presets.yml';

const PreheatModal = ({ isOpen, children, close, confirm, selectedPrinters, toolInputChange, bedInputChange, toolInputValue, bedInputValue, onPresetClick, temperaturePresets }) => (
  <Modal
    isOpen={isOpen}
    className={modalStyle.modal}
    overlayClassName={modalStyle.modalOverlay}
    onRequestClose={close}
  >
    <H1>{children}</H1>
    <SelectedPrinters selectedPrinters={selectedPrinters} />
    <div>
      <div className={style.aside}>
        <H2>Manual</H2>
        <TemperatureInput onChange={toolInputChange} value={toolInputValue}>Tool</TemperatureInput>
        <TemperatureInput onChange={bedInputChange} value={bedInputValue}>Bed</TemperatureInput>
      </div>
      <div className={style.aside}>
        <H2>Preset</H2>
        <PreheatPresets
          presets={temperaturePresets}
          onClick={onPresetClick}
        />
      </div>
    </div>
    <div className={style.row}>
      <ControllButton onClick={close}>Cancel</ControllButton>
      <ControllButton onClick={confirm}>Confirm</ControllButton>
    </div>
  </Modal>
);

export default PreheatModal;
