import React from 'react';

import style from './style.css'

const ProgressBar = (({progress}) => (
  <div
    className={style['progress-container']}
    >
    <div className={style["progress-wrapper"]}>
      <div className={style['progress']} style={{width: progress+"%"}}>
        .
      </div>
    </div>
    {progress == 0 ? 0 : Math.round(progress*100)/100}%
  </div>
));

export default ProgressBar;
