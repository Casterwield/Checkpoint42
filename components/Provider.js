import React, {useState} from 'react';

const CoordContext = React.createContext();

const CoordProvider = props => {
  const [pins, setPins] = useState([]);
  const [currReg, setReg] = useState({latitude: 42.8057, longitude: -73.8969});
  const [routes, setRoutes] = useState([]);
  const [goal, setGoal] = useState(0);
  const [distance, setDistance] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loc, setLoc] = useState({
    latitude: 42.8057,
    longitude: -73.8969,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });
  const [name, setName] = useState('');

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
        loc,
        setLoc,
        modalVisible,
        setModalVisible,
        name,
        setName,
        routes,
        setRoutes,
      }}>
      {props.children}
    </CoordContext.Provider>
  );
};

export {CoordProvider, CoordContext};
