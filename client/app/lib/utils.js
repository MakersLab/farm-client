import React from 'react';
import Moment from 'moment';

import units from '../constants/units';

export function getUnits(unit) {
  return (<span className="unit"> {units[unit]}</span>);
}

export function convertMinutesDuration(duration) {
  if (duration) {
    return Moment.utc((duration * 1000)).format('HH: mm: ss');
  }
  return '00: 00: 00';
}

let id = 0;

export function getUniqueId() {
  id += 1;
  return `unique-id-${id}`;
}
