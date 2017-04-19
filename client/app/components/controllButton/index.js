import React from 'react';
import style from '../controllBar/style.css';

const ControllButton = ({ text, onClick, disabled }) => (
  <button
    className={`${style.controllButton} ${disabled ? style['controllButton--disabled'] : ''}`}
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
    disabled={disabled}>
    {text}
  </button>
);

export default ControllButton;
