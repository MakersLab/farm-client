import React, { PropTypes } from 'react';

import Printer from '../printer'

class PrinterListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  generatePrinterList(printers) {
    return Object.keys(printers).map(printer =>
      <Printer {...printers[printer]} id={printer} />,
    );
  }

  render() {
    return (
      <div>
        {this.generatePrinterList(this.props.printers)}
      </div>);
  }
}


PrinterListComponent.propTypes = {
  printers: PropTypes.object.isRequired,
};

export default PrinterListComponent;
