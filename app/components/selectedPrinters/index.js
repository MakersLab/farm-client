import React from 'react';
import style from './style.css';

const SelectedPrinters = ({ selectedPrinters }) => (
  <div className={style.selectedPrinters}>
    <span>Selected printers</span>
    <ul>
      {selectedPrinters.map(printerName => (<li className={style.selectedPrintersLine}>{printerName}</li>))}
    </ul>
  </div>
);

export default SelectedPrinters;
