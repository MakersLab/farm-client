import React from 'react';
import * as Progress from 'react-progressbar.js';
import Dropzone from 'react-dropzone';

import style from './style.css';
import { getUnits, convertMinutesDuration } from '../../lib/utils';
import Link from '../link';

const ProgressBarLine = Progress.Line;

const progressBarOptions = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#888',
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

function getPrinterStateClassName(state, isFileHover) {
  if (!isFileHover) {
    switch (state) {
    case 'Operational': {
      return 'printerOperational';
    }
    case 'Printing': {
      return 'printerPrinting';
    }
    case 'Paused': {
      return 'printerPaused';
    }
    case 'Octoprint is unreachable': {
      return 'printerError';
    }
    case 'Printer is unreachable': {
      return 'printerError';
    }
    default: {
      return '';
    }
    }
  } else {
    return 'printerFileHover';
  }
}

const Printer = ({ name, state, progress, nozzleTemperature, bedTemperature, fileName, timePrinting, timeRemaining, link, selected, toggleSelected, onFileHover, onFileLeave, isFileHover, onFileDrop}) => (
  <Dropzone disableClick
    className={`printer ${style.printer} ${style[getPrinterStateClassName(state, isFileHover)]}`}
    onDragEnter={onFileHover}
    onDragLeave={onFileLeave}
    onDrop={onFileDrop}
  >
    <div className={``}>
      <div className={`${style.printerHeader} ${selected ? style['printer--selected'] : ''}`}>
        <div className={style.printerName}><a href={link} className={style.printerNameLink} target="_blank" rel="noreferrer noopener"><span>{name}</span></a></div>
        { selected && <div className={style.printerSelected}>selected</div> }
      </div>
      <div className={`${style.printerBody} ${selected ? style['printerBody--selected'] : ''}`} onClick={toggleSelected}>
        <div className={style.info}>state: <span>{state}</span></div>
        <div className={style.info}>nozzle temperature: <span>{nozzleTemperature}</span>{getUnits('temperature')}</div>
        <div className={style.info}>bed temperature: <span>{bedTemperature}</span>{getUnits('temperature')}</div>
        <div className={style.info} title={fileName}>file name: <span>{fileName}</span></div>
        <div className={style.info}>time printing: <span>{convertMinutesDuration(timePrinting)}</span></div>
        <div className={style.info}>time remaining: <span>{convertMinutesDuration(timeRemaining)}</span></div>
          <ProgressBarLine
            progress={progress/100}
            text={progress}
            initialAnimate
            options={progressBarOptions}
            containerClassName={style.progressBar}
          />
      </div>
    </div>
  </Dropzone>
);

export default Printer;
