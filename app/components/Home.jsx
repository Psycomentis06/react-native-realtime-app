import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS} from './__styleVars';
import UserItem from './UserItem';
import Login from './Login';
export default function Home({navigation}) {
  const styles = StyleSheet.create({
    error: {
      color: COLORS.danger,
    },
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    auth().onAuthStateChanged(function (user) {
      if (!user) {
        // User not signed in.
        //navigation.navigate('Login')
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  }, []);
  const getRooms = () => {};
  if (loggedIn === false) {
    return <Login navigation={navigation} />;
  }
  return (
    <View>
      {error.length > 0 && setTimeout(() => setError(''), 7000) && (
        <Text style={styles.error}> {error} </Text>
      )}
      <Text> Home works </Text>
      <Text> {loggedIn ? 'Logged' : 'Not logged in'} </Text>
      <Pressable
        onPress={() =>
          auth()
            .signOut()
            .catch((err) => setError(err.message))
        }>
        <Text> Logout </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text> Login </Text>
      </Pressable>
      <UserItem navigation={navigation} userId="123" />
    </View>
  );
}
