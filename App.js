import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './app/routes/Router';
import {LogBox} from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
