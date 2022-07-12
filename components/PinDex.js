/* View containing pins, with distance and times added as array is iterated over */

import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CoordContext} from './Provider.js';

const PinDex = (): Node => {
  const {chkPts} = useContext(CoordContext);

  return (
    <SafeAreaView>
      <View>
        {chkPts.map((marker, index) => {
          return (
            <SafeAreaView
              key={'Pindivual' + index}
              style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle]}>
                {'Checkpoint ' + marker.index}
              </Text>
              <View style={styles.rowStyle}>
                <Text style={[styles.sectionDescription]}>
                  {marker.dist + 'mi'}
                </Text>
                <Text style={[styles.sectionDescription]}>
                  {marker.ptTime + ' CheckPoint'}
                </Text>
                <Text style={[styles.sectionDescription]}>
                  {marker.totalTime + ' Total'}
                </Text>
              </View>
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
    paddingHorizontal: 9,
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

export default PinDex;
