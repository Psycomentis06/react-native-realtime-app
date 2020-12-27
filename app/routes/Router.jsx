import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from '../components/ChatRoom';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Login from '../components/Login';
export default function Router() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={ChatRoom} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
