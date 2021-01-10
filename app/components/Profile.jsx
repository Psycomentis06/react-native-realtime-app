import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, Pressable, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from './__styleVars';
export default function Profile({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.grey,
    },
    errorText: {
      textAlign: 'center',
      fontSize: 20,
      color: COLORS.danger,
    },
    content: {
      width: '100%',
      height: '40%',
      backgroundColor: COLORS.white,
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    username: {
      fontSize: 24,
      flexShrink: 1,
    },
    infos: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginTop: 10,
    },
    deleteText: {
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: COLORS.danger,
      marginTop: 30,
      padding: 10,
    },
  });
  const [user, setUser] = useState({avatar: null});
  const [error, setError] = useState('');
  const deleteUser = () => {
    if (user) {
      auth().onAuthStateChanged((user) =>
        database()
          .ref('users')
          .child(user.uid)
          .remove()
          .then(() =>
            user
              .delete()
              .then(() => navigation.navigate('Home'))
              .catch((err) => setError(err.message)),
          )
          .catch((err) => setError(err.message)),
      );
    } else {
      setError('Not Logged in');
    }
  };
  const getCurrentUser = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        database()
          .ref('users')
          .child(user.uid)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              setUser(snapshot.val());
            } else {
              setError('User not found');
            }
          });
      } else {
        setError('You are not logged in');
      }
    });
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: user.avatar}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text style={styles.username}> {user.username || 'Username'} </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View style={styles.infos}>
          <Text> Email: </Text>
          <Text> {user.email || 'Email'} </Text>
        </View>
        <View style={styles.infos}>
          <Text> Member Since: </Text>
          <Text>
            {new Date(user.createdAt).toLocaleDateString() || 'Not mentioned'}
          </Text>
        </View>
        <Pressable onPress={() => deleteUser()} style={styles.deleteText}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              elevation: 6,
              shadowColor: 'black',
              shadowOffset: {width: 15, height: 10},
            }}>
            Delete User
          </Text>
        </Pressable>
        {error.length > 0 && (
          <Pressable
            style={{backgroundColor: COLORS.white, padding: 10}}
            onPress={() => setError('')}>
            <Text style={styles.errorText}> {error} </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
