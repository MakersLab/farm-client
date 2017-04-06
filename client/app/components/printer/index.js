import React from 'react';

import style from './style.css';

const Printer = ({name, state, progress, nozzleTemperature, bedTemperature, fileName, timePrinting, timeRemaining}) => (
  <div className={style.printer}>
    <div>name: <span>{name}</span></div>
    <div>state: <span>{state}</span></div>
    <div>progress: <span>{progress}</span></div>
    {nozzleTemperature && <div>nozzle temperature: <span>{nozzleTemperature}</span></div>}
    {bedTemperature && <div>bed temperature: <span>{bedTemperature}</span></div>}
    {fileName && <div>file name: <span>{fileName}</span></div>}
    {timePrinting && <div>time printing: <span>{timePrinting}</span></div>}
    {timeRemaining && <div>time remaining: <span>{timeRemaining}</span></div>}
  </div>
);

export default Printer;
