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

const Map: () => Node = () => {
  const Coords = useContext(CoordContext);
  const mapRef = useRef(null);
  const lineCoords = [...Coords.pins];
  const dashPat = [4, 2];
  const home = {
    latitude: 42.8057,
    longitude: -73.8969,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  };
  const PinPoint = () => {
    Coords.setPins(prevPins => {
      prevPins.push(Coords.currReg);
      var temPins = [...prevPins];
      return temPins;
    });
  };
  const goToHome = e => {
    mapRef.current.animateToRegion(home, 1000);
  };
  const ClearPins = () => {
    Coords.setPins([]);
  };
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
        <SafeAreaView style={styles.topButtonContainer}>
          <View style={styles.topButtons}>
            <Button onPress={PinPoint} title="Save Route" color="white" />
          </View>
          <View style={styles.topButtons}>
            <Button onPress={PinPoint} title="View Routes" color="white" />
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
