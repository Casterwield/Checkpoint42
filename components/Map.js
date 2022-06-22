import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions, View} from 'react-native';

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height * 0.75,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map: () => Node = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.80578,
          longitude: -73.89697,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Map;
