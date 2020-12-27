import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import UserItem from './UserItem';
import auth from '@react-native-firebase/auth';
export default function Home({navigation}) {
  useEffect(() => {
    auth().onAuthStateChanged(function (user) {
      if (!user) {
        // User not signed in.
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <View>
      <Text> Home works </Text>
      <Pressable onPress={() => auth().signOut()}>
        <Text> Logout </Text>
      </Pressable>
    </View>
  );
}
