import React, { PropTypes } from 'react';

import style from './style.css';
import Printer from '../printer';

class PrinterListComponent extends React.Component {

  getPrinterComponent(key) {
    return (<Printer
      {...this.props.printers[key]} key={key}
      toggleSelected={() => { this.props.toggleSelected(key); }} />);
  }

  generatePrinterList() {
    let keys = Object.keys(this.props.printers);
    let printerRows = [];
    if (keys.length > 0) {
      let howManyTimes = Math.floor(keys.length / 2);
      for (let i = 0; i < howManyTimes; i+=1) {
        console.log(Math.floor(keys.length/2));
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
      <div className={style.printerList}>
        {this.generatePrinterList()}
      </div>);
  }
}


PrinterListComponent.propTypes = {
  printers: PropTypes.object.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default PrinterListComponent;
