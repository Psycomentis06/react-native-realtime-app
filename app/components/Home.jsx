import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from './__styleVars';
import UserItem from './UserItem';
import Login from './Login';
import {TextInput} from 'react-native-gesture-handler';
import HomeButtonBar from './HomeBottomBar';
export default function Home({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.grey,
    },
    error: {
      color: COLORS.danger,
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
    },
    searchInput: {
      width: '85%',
      backgroundColor: COLORS.white,
    },
    searchButton: {
      backgroundColor: COLORS.primary,
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'sans-serif-condensed',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.primary,
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
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
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        getRooms();
      }
    });
  }, []);
  const getRooms = () => {
    let usersArray = [];
    setLoading(true);
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
        setLoading(false);
      });
  };
  if (loggedIn === false) {
    return <Login navigation={navigation} />;
  }
  return (
    <View style={styles.container}>
      {error.length > 0 && setTimeout(() => setError(''), 7000) && (
        <Text style={styles.error}> {error} </Text>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={COLORS.black}
        />
        <Pressable style={styles.searchButton}>
          <Icon name="information-circle-outline" color="black" size={20} />
        </Pressable>
      </View>
      <Text style={styles.title}> Users </Text>
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
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      <HomeButtonBar />
    </View>
  );
}
