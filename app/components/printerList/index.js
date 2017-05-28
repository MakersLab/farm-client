import React, { PropTypes } from 'react';
import moment from 'moment';
import Dropzone from 'react-dropzone';

import style from './style.css';
import Printer from '../printer';
import H1 from '../h1';
import api from '../../lib/api';

class PrinterListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      fileHoverPrinter: null,
    };
    this.onPrinterFileHover = this.onPrinterFileHover.bind(this);
    this.onPrinterFileLeave = this.onPrinterFileLeave.bind(this);
    this.onPrinterFileDrop = this.onPrinterFileDrop.bind(this);

    window.addEventListener('dragenter', () => {
      if (this.props.selectedPrinters.length > 0 && this.state.fileHoverPrinter !== 'overlay-window') {
        this.setState({ fileHoverPrinter: 'overlay-window' });
    }
    });
  }

  onPrinterFileHover(printerName) {
    return () => {
      if (this.state.fileHoverPrinter !== printerName && !this.props.selectedPrinters.length) {
        if (printerName !== 'overlay' && this.props.printers[printerName].state === 'Operational') {
          this.setState({ fileHoverPrinter: printerName });
        }
      } else if (printerName === 'overlay' && this.props.selectedPrinters.length > 0) {
        this.setState({ fileHoverPrinter: printerName });
      }
    };
  }

  onPrinterFileLeave() {
    if(this.state.fileHoverPrinter !== 'overlay-window' || this.state.fileHoverPrinter !== 'overlay') {
      this.setState({ fileHoverPrinter: null });
    }
  }

  onPrinterFileDrop(files) {
    let selectedPrinters;
    if (this.state.fileHoverPrinter && (this.state.fileHoverPrinter !== 'overlay' && this.state.fileHoverPrinter !== 'overlay-window')) {
      selectedPrinters = [this.state.fileHoverPrinter]
    } else if (this.state.fileHoverPrinter) {
      selectedPrinters = this.props.selectedPrinters;
    }
    this.uploadFile(files, { selectedPrinters });
  }

  uploadFile(file, printers) {
    this.props.setFileUploadState(true);
    api.sendFile('/api/load', 'post', file, printers)
    .then(() => {
      this.setState({ fileHoverPrinter: null });
      this.props.setFileUploadState(false);
    });
  }

  getPrinterComponent(key) {
    return (<Printer
      {...this.props.printers[key]} key={key}
      toggleSelected={() => { this.props.toggleSelected(key); }
    }
      onFileHover={this.onPrinterFileHover(key)}
      onFileLeave={this.onPrinterFileLeave}
      isFileHover={this.state.fileHoverPrinter === key}
      onFileDrop={this.onPrinterFileDrop}
    />);
  }

  formatTime(timestamp) {
    return moment.unix(timestamp).format('YYYY:MM:DD HH:mm:ss');
  }

  generatePrinterList() {
    const keys = Object.keys(this.props.printers);
    const printerRows = [];
    if (keys.length > 0) {
      const howManyTimes = Math.ceil(keys.length / 2);
      for (let i = 0; i < howManyTimes; i+=1) {
        printerRows.push(
          <div key={i}>
            {this.getPrinterComponent(keys[i * 2])}
            { keys[(i * 2) + 1] && this.getPrinterComponent(keys[(i * 2) + 1])}
          </div>);
      }
      return printerRows;
    }
    return (<div />);
  }

  render() {
    return (
      <div>
        <div className={style.printerList}>
          {this.generatePrinterList()}
        </div>
        <div className={style.lastUpdated}>last updated {this.formatTime(this.props.updated)}</div>
        <Dropzone className={`${style.overlayDropzone} ${this.state.fileHoverPrinter === 'overlay-window' || this.state.fileHoverPrinter === 'overlay'  ? style.overlayDropzoneFileHover : ''}`}
          onDragEnter={this.onPrinterFileHover('overlay')}
          onDragLeave={this.onPrinterFileLeave}
          onDrop={this.onPrinterFileDrop}
          disableClick
          preventDropOnDocument={false}
        ></Dropzone>
      </div>);
  }
}


PrinterListComponent.propTypes = {
  printers: PropTypes.object.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default PrinterListComponent;
