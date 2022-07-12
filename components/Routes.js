/* page that allows viewing, deleting, and loading of routes */

import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Routes: () => Node = ({navigation}) => {
  const {pins, setPins, routes, setRoutes} = useContext(CoordContext);
  const getAllKeys = async callback => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    console.log(keys, 'keys');
    let values;
    try {
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      // read error
    }
    setRoutes(values);
    console.log(routes, 'routes');
  };
  const removeValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  useEffect(() => {
    getAllKeys();
  }, []);

  return (
    <SafeAreaView>
      {routes.map(r => {
        return (
          <View key={r[0]}>
            <Text>{r[0]}</Text>
            <Pressable
              onPress={() => {
                setPins(JSON.parse(r.slice(1)));
                navigation.navigate('Home');
              }}>
              <Text>Load Route</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                const toDel = r[0];
                removeValue(toDel);
                getAllKeys();
              }}>
              <Text>Delete Route</Text>
            </Pressable>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default Routes;
