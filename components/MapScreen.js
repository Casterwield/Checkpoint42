/**
Map View screen containing mapbox, input bar, and individual checkpoint view
**/

import React from 'react';
import Map from './Map';
import PinDividual from './PinDex.js';
import StatBar from './StatBar.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import DismissKeyboardView from './DismissKeyboardView.js';

let {height, width} = Dimensions.get('window');

const MapScreen: () => Node = ({navigation}) => {
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

export default MapScreen;
