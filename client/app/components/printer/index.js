import React from 'react';

import style from './style.css';

const Printer = ({name, state, progress, nozzleTemperature, bedTemperature, fileName, timePrinting, timeRemaining}) => (
  <div className={style.printer}>
    <div>name: <span>{name}</span></div>
    <div>state: <span>{state}</span></div>
    <div>progress: <span>{progress}</span></div>
    <div>nozzle temperature: <span>{nozzleTemperature}</span></div>
    <div>bed temperature: <span>{bedTemperature}</span></div>
    <div>file name: <span>{fileName}</span></div>
    <div>time printing: <span>{timePrinting}</span></div>
    <div>time remaining: <span>{timeRemaining}</span></div>
  </div>
);

export default Printer;
