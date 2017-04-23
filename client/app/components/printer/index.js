import React from 'react';
import * as Progress from 'react-progressbar.js';

import style from './style.css';
import { getUnits, convertMinutesDuration } from '../../lib/utils';
import Link from '../link';

const ProgressBarLine = Progress.Line;

const progressBarOptions = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: { width: '100%', height: '100%' },
  text: {
    style: {
      // Text color.
      // Default: same as stroke color (options.color)
      color: '#999',
      position: 'relative',
      right: '-150px',
      top: '5px',
      padding: 0,
      margin: 0,
      transform: null,
    },
    autoStyleContainer: false,
  },
  from: { color: '#FFEA82' },
  to: { color: '#ED6A5A' },
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100) + ' %');
  },
};

const Printer = ({ name, state, progress, nozzleTemperature, bedTemperature, fileName, timePrinting, timeRemaining, link, selected, toggleSelected}) => (
  <div className={`printer ${style.printer}`}>
    <div className={`${style.printerHeader} ${selected ? style['printer--selected'] : '' }`}>
      <div className={style.printerName}><a href={link} className={style.printerNameLink} target="_blank" rel="noreferrer noopener"><span>{name}</span></a></div>
      { selected && <div className={style.printerSelected}>selected</div> }
    </div>
    <div className={`${style.printerBody} ${selected ? style['printerBody--selected'] : ''}`} onClick={toggleSelected}>
      <div>state: <span>{state}</span></div>
      <div>nozzle temperature: <span>{nozzleTemperature}</span>{getUnits('temperature')}</div>
      <div>bed temperature: <span>{bedTemperature}</span>{getUnits('temperature')}</div>
      <div>file name: <span>{fileName}</span></div>
      <div>time printing: <span>{convertMinutesDuration(timePrinting)}</span></div>
      <div>time remaining: <span>{convertMinutesDuration(timeRemaining)}</span></div>
        <ProgressBarLine
          progress={progress/100}
          text={progress}
          initialAnimate
          options={progressBarOptions}
          containerClassName={style.progressBar}
          />
    </div>
  </div>
);

export default Printer;
