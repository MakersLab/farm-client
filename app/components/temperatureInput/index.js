import React from 'react';
import style from './style.css';
import { getUniqueId } from '../../lib/utils';

const inputId = getUniqueId();

const TemperatureInput = ({ children, value, onChange }) => (
  <div className={style.inputWrapper}>
    <label htmlFor={inputId}>{children}</label>
    <input id={inputId} type="number" min="0" value={value} onChange={onChange} />
    <span>°C</span>
  </div>
);

export default TemperatureInput;
