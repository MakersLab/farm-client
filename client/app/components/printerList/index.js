import React, { PropTypes } from 'react';
import moment from 'moment';

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
  }

  onPrinterFileHover(printerName) {
    return () => {
      if (this.state.fileHoverPrinter !== printerName && !this.props.selectedPrinters.length) {
        console.log('enter', printerName);
        this.setState({ fileHoverPrinter: printerName });
      }
    };
  }

  onPrinterFileLeave() {
    console.log('leave');
    this.setState({ fileHoverPrinter: null });
  }

  onPrinterFileDrop(files) {
    this.uploadFile(files, {selectedPrinters:[this.state.fileHoverPrinter]});
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
    let keys = Object.keys(this.props.printers);
    let printerRows = [];
    if (keys.length > 0) {
      let howManyTimes = Math.ceil(keys.length / 2);
      for (let i = 0; i < howManyTimes; i+=1) {
        printerRows.push(
          <div key={i}>
            {this.getPrinterComponent(keys[i * 2])}
            { keys[(i * 2) + 1] && this.getPrinterComponent(keys[(i * 2) + 1])}
          </div>);
      }
      return printerRows;
    }
    return (<div></div>);
  }

  render() {
    return (
      <div>
        <div className={style.printerList}>
          {this.generatePrinterList()}
        </div>
        <div className={style.lastUpdated}>last updated {this.formatTime(this.props.updated)}</div>
      </div>);
  }
}


PrinterListComponent.propTypes = {
  printers: PropTypes.object.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default PrinterListComponent;
