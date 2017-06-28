import React from 'react';
import PrinterList from '../../containers/printer'
import ControllBar from '../../containers/controllBar';
import SettingsContainer from '../../containers/settings';

class MainViewComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <PrinterList />
      <ControllBar />
      <SettingsContainer />
    </div>);
  }
}

export default MainViewComponent;
