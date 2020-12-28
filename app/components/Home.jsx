import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from './__styleVars';
import UserItem from './UserItem';
import Login from './Login';
export default function Home({navigation}) {
  const styles = StyleSheet.create({
    error: {
      color: COLORS.danger,
    },
  });
  const [loggedIn, setLoggedIn] = useState(false); // user login state
  const [error, setError] = useState(''); // request errors
  const [loading, setLoading] = useState(false); // fetch data indicator
  const [users, setUsers] = useState([]); // available users
  useEffect(() => {
    auth().onAuthStateChanged(function (user) {
      if (!user) {
        // User not signed in.
        //navigation.navigate('Login')
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        getRooms();
      }
    });
  }, []);
  const getRooms = () => {
    let usersArray = [];
    database()
      .ref('/users')
      .on('value', (snapshot) => {
        snapshot.forEach((user) => {
          const userEl = {
            id: user.key,
            user: user.val(),
          };
          usersArray.push(userEl);
        });
        setUsers(usersArray);
      });
  };
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
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={(user) => (
          <UserItem
            navigation={navigation}
            userId={user.item.id}
            user={user.item.user}
          />
        )}
      />
    </View>
  );
}
