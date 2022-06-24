import React, {useContext, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
} from 'react-native';
import {CoordContext} from './Provider.js';

const Routes: () => Node = ({navigation}) => {
  return (
    <SafeAreaView>
      <Button title="Go to Map" onPress={navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

export default Routes;
