import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import MapMain from './components/MapMain';
import Routes from './components/Routes';
import {CoordProvider} from './components/Provider.js';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppT from './AppT.js';

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
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={AppT}
              navigation={navigation}
            />
            <Stack.Screen
              name="Routes"
              component={Routes}
              navigation={navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CoordProvider>
    </SafeAreaView>
  );
};

export default App;
