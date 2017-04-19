import React from 'react';
import PrinterList from '../../containers/printer'
import ControllBar from '../../containers/controllBar';

class MainViewComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <PrinterList />
    </div>);
  }
}

export default MainViewComponent;
