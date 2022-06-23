/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Colors,
} from 'react-native';
import {CoordContext} from './Provider.js';

const PinDividual = ({title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  const Coords = useContext(CoordContext);
  return (
    <SafeAreaView>
      {Coords.pins.map((marker, index) => {
        return (
          <View key={'Pindivual' + index} style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}>
              {'Marker ' + index}
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}>
              {JSON.stringify(marker)}
            </Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default PinDividual;
