import React, { PropTypes } from 'react';

import Printer from '../printer'

class PrinterListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  generatePrinterList(printers) {
    return printers.map(printer =>
      <Printer {...printer} />,
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
  printers: PropTypes.array.isRequired,
};

export default PrinterListComponent;
