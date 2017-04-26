import React, { PropTypes } from 'react';
import moment from 'moment';

import style from './style.css';
import Printer from '../printer';
import H1 from '../h1';

class PrinterListComponent extends React.Component {

  formatTime(timestamp) {
    return moment.unix(timestamp).format('YYYY:MM:DD HH:mm:ss');
  }

  getPrinterComponent(key) {
    return (<Printer
      {...this.props.printers[key]} key={key}
      toggleSelected={() => { this.props.toggleSelected(key); }} />);
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
