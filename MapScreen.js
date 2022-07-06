/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Map from './components/Map';
import {CoordProvider} from './components/Provider.js';
import PinDividual from './components/PinDex.js';
import StatBar from './components/StatBar.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import DismissKeyboardView from './components/DismissKeyboardView.js';

let {height, width} = Dimensions.get('window');

const AppT: () => Node = ({navigation}) => {
  const backgroundStyle = {
    backgroundColor: 'black',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <CoordProvider>
        <StatusBar barStyle="light-content" /> */}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={42}>
        <DismissKeyboardView>
          <Map navigation={navigation} />
          <StatBar />
        </DismissKeyboardView>
      </KeyboardAvoidingView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={
          (backgroundStyle,
          {
            height: height * 0.36,
            width: width,
          })
        }>
        <SafeAreaView style={backgroundStyle}>
          <PinDividual />
        </SafeAreaView>
      </ScrollView>
      {/* </CoordProvider> */}
    </SafeAreaView>
  );
};

export default AppT;
