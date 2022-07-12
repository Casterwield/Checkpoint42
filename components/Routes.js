/* page that allows viewing, deleting, and loading of routes */

import React, {useContext, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import pinDataCalc from './PinDataCalc.js';
import {CoordContext} from './Provider.js';

const Routes: () => Node = ({navigation}) => {
  const {setGoal, setPins, routes, setRoutes} = useContext(CoordContext);
  const getAllKeys = useCallback(
    async callback => {
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
      } catch (e) {
        // read key error
      }
      let values;
      try {
        values = await AsyncStorage.multiGet(keys);
      } catch (e) {
        // read error
      }
      setRoutes(values);
    },
    [setRoutes],
  );
  const removeValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };
  const backgroundStyle = {
    backgroundColor: 'black',
    flex: 1,
  };
  useEffect(() => {
    getAllKeys();
  }, [getAllKeys]);
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <SafeAreaView style={backgroundStyle}>
          {routes.map(r => {
            return (
              <View key={r[0]} style={styles.sectionContainer}>
                <Text style={styles.title}>{r[0]}</Text>
                <View style={styles.rowStyle}>
                  <Pressable
                    onPress={() => {
                      const data = JSON.parse(r[1]);
                      setPins(data[1]);
                      setGoal(data[0]);
                      navigation.navigate('Home');
                    }}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.text}>Load Route</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      const toDel = r[0];
                      removeValue(toDel);
                      getAllKeys();
                    }}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.text}>Delete Route</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: 'teal',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 3,
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '42%',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    marginVertical: 5,
  },
});

export default Routes;
