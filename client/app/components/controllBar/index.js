import React, { PropTypes } from 'react';

import ControllButton from '../ControllButton';
import style from './style.css';

class ControllBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const disabled = this.props.selectedPrinters.length <= 0;
    return (
      <div className={style.controllBar}>
        <ControllButton text="print" disabled={disabled} />
        <ControllButton text="pause" disabled={disabled} />
        <ControllButton text="load" disabled={disabled} />
        <ControllButton text="resume" disabled={disabled} />
      </div>);
  }
}

export default ControllBar;
