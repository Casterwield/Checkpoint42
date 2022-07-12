/* function component to build the  */
import {convertDistance, getPathLength} from 'geolib';
import convertTime from './ConvertTime.js';
const pinDataCalc = (pins, goal) => {
  var outPutArray = [];
  var chkPts = [];
  pins.forEach((pin, index, array) => {
    if (pin.isCheckPoint || index === array.length - 1) {
      chkPts.push(index);
    }
  });
  chkPts.forEach((chkPt, index, array) => {
    const prev = array[index - 1] || 0;
    const pathLength = getPathLength(pins.slice(prev, chkPt + 1));
    const dist = convertDistance(pathLength, 'mi').toFixed(2);
    const ptTime = convertTime(
      goal * (pathLength / getPathLength(pins)).toFixed(2),
    );
    const totalTime = convertTime(
      goal *
        (getPathLength(pins.slice(0, chkPt + 1)) / getPathLength(pins)).toFixed(
          2,
        ),
    );
    var markerObj = {
      index: index + 1,
      dist: dist,
      ptTime: ptTime,
      totalTime: totalTime,
    };
    outPutArray.push(markerObj);
  });
  return outPutArray;
};

export default pinDataCalc;
