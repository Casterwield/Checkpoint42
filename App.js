/* App main */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import MapMain from './components/MapMain';
import Routes from './components/Routes';
import {CoordProvider} from './components/Provider.js';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import MapScreen from './components/MapScreen.js';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const backgroundStyle = {
    backgroundColor: 'black',
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <CoordProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              options={{headerShown: false}}
              component={MapScreen}
            />
            <Stack.Screen
              name="Routes"
              component={Routes}
              options={{
                headerStyle: {
                  backgroundColor: 'teal',
                },
                headerTintColor: 'white',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CoordProvider>
    </SafeAreaView>
  );
};

export default App;
