import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from '../components/ChatRoom';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import About from '../components/About';
import Bug from '../components/Bug';
export default function Router() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Chat" component={ChatRoom} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Report" component={Bug} />
    </Stack.Navigator>
  );
}
