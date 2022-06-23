/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
} from 'react-native';
import {CoordContext} from './Provider.js';

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mapContainer: {
    height: height * 0.58,
    width: width,
  },
  container: {
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
  button: {
    backgroundColor: 'teal',
    position: 'absolute',
    bottom: 13,
    borderRadius: 42,
    alignSelf: 'center',
  },
  targetText: {
    fontSize: 42,
    textAlignVertical: 'center',
  },
});
const Map: () => Node = () => {
  const Coords = useContext(CoordContext);
  const mapRef = useRef(null);
  const PinPoint = () => {
    Coords.setPins(prevPins => {
      prevPins.push(Coords.currReg);
      var temPins = [...prevPins];
      return temPins;
    });
  };
  const home = {
    latitude: 42.8057,
    longitude: -73.8969,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  };
  const goToPin = e => {
    mapRef.current.animateToRegion(home, 2 * 1000);
  };
  const lineCoords = [...Coords.pins];
  const dashPat = [4, 2];
  return (
    <SafeAreaView>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          onRegionChange={region => {
            let pinLoc = {
              latitude: Number(region.latitude.toFixed(4)),
              longitude: Number(region.longitude.toFixed(4)),
            };
            Coords.setReg(pinLoc);
          }}
          initialRegion={{
            latitude: 42.8057,
            longitude: -73.8969,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}>
          {Coords.pins.map((marker, index) => {
            return (
              <Marker
                key={'Marker ' + index}
                coordinate={marker}
                title={'Marker ' + index}
              />
            );
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
        <View style={styles.button}>
          <Button onPress={PinPoint} title="Add Pin" color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Map;
