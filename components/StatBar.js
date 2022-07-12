/* component that allows input of goal distance */

import React, {useContext} from 'react';
import {convertDistance, getPathLength} from 'geolib';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import {CoordContext} from './Provider.js';
let {height, width} = Dimensions.get('window');

const StatBar = (): Node => {
  const {pins, goal, setGoal} = useContext(CoordContext);
  const pinCoords = [...pins];

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.rowText}>
        <Text style={styles.statText}>Time Goal:</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="number-pad"
          defaultValue={goal === 0 ? null : goal.toString()}
          placeholder={'(in minutes)'}
          placeholderTextColor="#32cd32"
          maxLength={4}
          clearTextOnFocus={true}
          onEndEditing={e => {
            setGoal(Number(e.nativeEvent.text));
          }}
        />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.statText}>Route Distance:</Text>
        <Text style={[styles.statText, {marginLeft: 42}]}>
          {!pins.length
            ? '0.00mi'
            : convertDistance(getPathLength(pinCoords), 'mi').toFixed(2) +
              ' mi'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: height * 0.08,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  statText: {
    marginTop: 8,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  rowText: {
    flex: 1,
    flexDirection: 'row',
  },
  inputText: {
    marginTop: 8,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'green',
    height: 28,
    width: width * 0.3,
    borderRadius: 10,
    bottom: 3,
    left: 50,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});

export default StatBar;
