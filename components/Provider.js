import React, {useState} from 'react';

const CoordContext = React.createContext();

const CoordProvider = props => {
  const [pins, setPins] = useState([]);
  const [currReg, setReg] = useState({latitude: 42.8057, longitude: -73.8969});
  const [goal, setGoal] = useState(0);
  const [distance, setDistance] = useState('');
  const [gpsLoc, setGPSLoc] = useState({});
  return (
    <CoordContext.Provider
      value={{
        pins,
        setPins,
        currReg,
        setReg,
        goal,
        setGoal,
        distance,
        setDistance,
        gpsLoc,
        setGPSLoc,
      }}>
      {props.children}
    </CoordContext.Provider>
  );
};

export {CoordProvider, CoordContext};
