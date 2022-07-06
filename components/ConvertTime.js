/* function component to convert time from minutes to hours minutes seconds */

const convertTime = minutes => {
  var sign = minutes < 0 ? '-' : '';
  var min = Math.floor(Math.abs(minutes));
  var sec = Math.floor((Math.abs(minutes) * 60) % 60);
  return sign + (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
};

export default convertTime;
