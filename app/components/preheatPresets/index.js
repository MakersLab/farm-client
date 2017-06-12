import React from 'react';
import { forEach } from 'lodash'

import ControllButton from '../controllButton';
import { getUniqueId } from '../../lib/utils';

const PreheatPresets = ({ presets, onClick }) => (
  <div>
    {Object.keys(presets).map(preset => {
      return (<div>
        <ControllButton onClick={() => { onClick(presets[preset].value); }}>{preset}</ControllButton>
      </div>);
    })}
  </div>
);

export default PreheatPresets;
