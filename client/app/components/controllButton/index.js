import React from 'react';
import style from '../controllBar/style.css';

const ControllButton = ({ onClick, disabled, children }) => (
  <button
    className={`${style.controllButton} ${disabled ? style['controllButton--disabled'] : ''}`}
    onClick={() => {
      if (!disabled && typeof (onClick) === 'function') {
        onClick();
      }
    }}
    disabled={disabled}>
    {children}
  </button>
);

export default ControllButton;
