/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {getDistance, convertDistance, getPathLength} from 'geolib';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CoordContext} from './Provider.js';
import convertTime from './ConvertTime.js';

const PinDividual = ({title}): Node => {
  const Coords = useContext(CoordContext);
  const pinCoords = [...Coords.pins];

  return (
    <SafeAreaView>
      <View>
        {pinCoords.map((marker, index, array) => {
          return (
            <SafeAreaView
              key={'Pindivual' + index}
              style={styles.sectionContainer}>
              {index === 0 ? null : (
                <Text style={[styles.sectionTitle]}>
                  {index === 0 ? 'Start' : 'Checkpoint ' + index}
                </Text>
              )}
              {index === 0 ? null : (
                <View style={styles.rowStyle}>
                  <Text style={[styles.sectionDescription]}>
                    {convertDistance(
                      getDistance(array[index - 1], marker),
                      'mi',
                    ).toFixed(2) + 'mi'}
                  </Text>
                  <Text style={[styles.sectionDescription]}>
                    {convertTime(
                      (
                        Coords.goal *
                        convertDistance(
                          getDistance(array[index - 1], marker) /
                            getPathLength(pinCoords),
                        )
                      ).toFixed(2),
                    ) + ' CheckPoint'}
                  </Text>
                  <Text style={[styles.sectionDescription]}>
                    {convertTime(
                      (
                        Coords.goal *
                        convertDistance(
                          getPathLength(array.slice(0, index + 1)) /
                            getPathLength(pinCoords),
                        )
                      ).toFixed(2),
                    ) + ' Total'}
                  </Text>
                </View>
              )}
            </SafeAreaView>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: 'green',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  sectionDescription: {
    paddingBottom: 4,
    paddingHorizontal: 13,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
    color: 'white',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PinDividual;
