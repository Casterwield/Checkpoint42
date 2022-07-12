/* actual map component */

import React, {useContext, useRef, useEffect, useCallback} from 'react';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
  Pressable,
} from 'react-native';
import {CoordContext} from './Provider.js';
import RouteName from './RouteName.js';
import pinDataCalc from './PinDataCalc.js';
import Geolocation from '@react-native-community/geolocation';

let {height, width} = Dimensions.get('window');

const Map: () => Node = ({navigation}) => {
  const {
    setPins,
    setReg,
    pins,
    goal,
    setGoal,
    currReg,
    loc,
    setLoc,
    modalVisible,
    setModalVisible,
    setChkPts,
  } = useContext(CoordContext);
  const mapRef = useRef(null);
  const lineCoords = [...pins];
  const dashPat = [4, 2];
  useEffect(() => {
    let tempLoc = {
      latitudeDelta: 0.00842,
      longitudeDelta: 0.00842,
    };
    Geolocation.getCurrentPosition(pos => {
      tempLoc.latitude = pos.coords.latitude;
      tempLoc.longitude = pos.coords.longitude;
      setLoc(tempLoc);
    });
    goToHome();
  }, [goToHome, setLoc]);
  useEffect(() => {
    var chkPtArray;
    setPins(prevPins => {
      let tempPins = [...prevPins];
      chkPtArray = pinDataCalc(tempPins, goal);
      setChkPts(chkPtArray);
      return tempPins;
    });
  }, [goal, setPins, setChkPts]);

  const PinPoint = () => {
    let newPin = currReg;
    newPin.isCheckPoint = false;
    newPin.voiceCall = '';
    setPins(prevPins => {
      prevPins.push(currReg);
      var tempPins = [...prevPins];
      var chkPtArray = pinDataCalc(tempPins, goal);
      setChkPts(chkPtArray);
      return tempPins;
    });
  };
  const goToHome = useCallback(
    e => {
      mapRef.current.animateToRegion(loc, 1000);
    },
    [mapRef, loc],
  );
  const ClearPins = () => {
    setPins([]);
    setGoal(0);
  };
  const setTarget = pinLoc => {
    setReg(pinLoc);
  };
  const mapReady = () => {
    goToHome();
  };
  const toggleCheckpoint = pointDex => {
    var chkPtArray;
    setPins(prevPins => {
      let tempPin = {...prevPins[pointDex]};
      let tempPins = [...prevPins];
      tempPin.isCheckPoint = !prevPins[pointDex].isCheckPoint;
      tempPins[pointDex] = tempPin;
      chkPtArray = pinDataCalc(tempPins, goal);
      setChkPts(chkPtArray);
      return tempPins;
    });
  };
  const deletePin = delDex => {
    setPins(prevPins => {
      const newPins = [];
      prevPins.forEach((pin, pinDex) => {
        if (pinDex !== delDex) {
          newPins.push(pin);
        }
      });
      const deleted = pinDataCalc(newPins, goal);
      setChkPts(deleted);
      return newPins;
    });
  };
  const dragPin = (dragDex, newCoord) => {
    var chkPtArray;
    setPins(prevPins => {
      let tempPin = {...prevPins[dragDex]};
      let tempPins = [...prevPins];
      tempPin.latitude = newCoord.latitude;
      tempPin.longitude = newCoord.longitude;
      tempPins[dragDex] = tempPin;
      chkPtArray = pinDataCalc(tempPins, goal);
      setChkPts(chkPtArray);
      return tempPins;
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          onMapReady={mapReady}
          showsUserLocation
          onRegionChange={region => {
            let pinLoc = {
              latitude: Number(region.latitude.toFixed(4)),
              longitude: Number(region.longitude.toFixed(4)),
            };
            setTarget(pinLoc);
          }}
          initialRegion={loc}>
          {pins.map((marker, index) => {
            if (index === 0) {
              return (
                <Marker
                  key={'Marker ' + index}
                  coordinate={marker}
                  draggable
                  onDrag={e => {
                    dragPin(index, e.nativeEvent.coordinate);
                  }}
                  pinColor="green">
                  <Callout>
                    <View style={styles.colStyle}>
                      <Text style={styles.modalText}>StartPoint</Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={e => {
                          deletePin(index);
                        }}>
                        <Text>Delete Pin</Text>
                      </Pressable>
                    </View>
                  </Callout>
                </Marker>
              );
            } else if (index === pins.length - 1) {
              return (
                <Marker
                  key={'Marker ' + index}
                  coordinate={marker}
                  draggable
                  onDrag={e => {
                    dragPin(index, e.nativeEvent.coordinate);
                  }}
                  pinColor="red">
                  <Callout tyle={styles.callout}>
                    <View style={styles.colStyle}>
                      <Text style={styles.modalText}>EndPoint</Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={e => {
                          deletePin(index);
                        }}>
                        <Text>Delete Pin</Text>
                      </Pressable>
                    </View>
                  </Callout>
                </Marker>
              );
            } else {
              return (
                <Marker
                  key={'Marker ' + index}
                  coordinate={marker}
                  draggable
                  onDrag={e => {
                    dragPin(index, e.nativeEvent.coordinate);
                  }}
                  pinColor={marker.isCheckPoint ? 'blue' : 'grey'}>
                  <Callout style={styles.callout}>
                    <SafeAreaView style={styles.calloutContainer}>
                      <View style={styles.colStyle}>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={e => {
                            toggleCheckpoint(index);
                          }}>
                          <Text style={styles.modalText}>
                            {marker.isCheckPoint
                              ? 'unMake Checkpoint'
                              : 'Make Checkpoint'}
                          </Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={e => {
                            deletePin(index);
                          }}>
                          <Text style={styles.modalText}>Delete Pin</Text>
                        </Pressable>
                      </View>
                    </SafeAreaView>
                  </Callout>
                </Marker>
              );
            }
          })}
          <Polyline
            coordinates={lineCoords}
            strokeColor="teal"
            lineDashPattern={dashPat}
          />
        </MapView>
        <View style={styles.target}>
          <Text style={styles.targetText}>{'\u2316'}</Text>
        </View>
        <SafeAreaView style={styles.topButtonContainer}>
          <View style={styles.topButtons}>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title="Save Route"
              color="white"
            />
          </View>
          <View>
            <RouteName />
          </View>
          <View style={styles.topButtons}>
            <Button
              onPress={() => navigation.navigate('Routes')}
              title="View Routes"
              color="white"
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.bottomButtonContainer}>
          <View style={styles.bottomButtons}>
            <Button onPress={goToHome} title="Center Map" color="white" />
          </View>
          <View style={styles.bottomButtons}>
            <Button onPress={PinPoint} title="Add Pin" color="white" />
          </View>
          <View style={styles.bottomButtons}>
            <Button onPress={ClearPins} title="Clear Pins" color="white" />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: height * 0.58,
    width: width,
  },
  callout: {
    flex: 1,
    height: height * 0.15,
    width: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colStyle: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContainer: {
    margin: 5,
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  target: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '46%',
  },
  topButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 13,
  },
  bottomButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 25,
  },
  topButtons: {
    backgroundColor: 'teal',
    borderRadius: 42,
    flex: 1,
    marginHorizontal: 28,
    opacity: 0.85,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 2,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'teal',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textFrame: {
    borderRadius: 13,
    backgroundColor: '#32cd32',
    borderWidth: 2,
    borderColor: 'teal',
    width: '100%',
  },
  bottomButtons: {
    backgroundColor: 'teal',
    borderRadius: 42,
    flex: 1,
    marginHorizontal: 5,
    opacity: 0.85,
  },
  targetText: {
    fontSize: 42,
    textAlignVertical: 'center',
  },
});

export default Map;
