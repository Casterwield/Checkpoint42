import React from 'react';

const convertTime = minutes => {
  var sign = minutes < 0 ? '-' : '';
  var hours = Math.floor(Math.abs(minutes) / 60);
  var min = Math.floor(Math.abs(minutes) % 60);
  var sec = Math.floor((Math.abs(minutes) * 60) % 60);

  return (
    sign +
    hours +
    ':' +
    (min < 10 ? '0' : '') +
    min +
    ':' +
    (sec < 10 ? '0' : '') +
    sec
  );
};

export default convertTime;
