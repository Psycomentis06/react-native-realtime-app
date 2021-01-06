import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import auth from '@react-native-firebase/auth';
export default function UserItem({user, userId, navigation}) {
  const [currentUser, setCurrentUser] = useState({uid: ''});
  const styles = StyleSheet.create({
    container: {
      backgroundColor: userId === currentUser.uid ? 'gold' : COLORS.primary,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
      height: 100,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      resizeMode: 'cover',
      marginLeft: 10,
      marginRight: 10,
    },
    username: {
      color: userId === currentUser.uid ? COLORS.black : COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
      flexShrink: 1,
    },
    date: {
      fontSize: 12,
      color: userId === currentUser.uid ? COLORS.black : COLORS.grey,
      opacity: userId === currentUser.uid ? 0.7 : 1,
      textAlign: 'right',
    },
    userData: {
      width: 170,
    },
  });
  const getCurrentUser = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  };
  useEffect(() => getCurrentUser(), []);
  return (
    <Pressable
      onPress={() => {
        userId !== undefined
          ? navigation.navigate('Chat', {
              userId: userId,
              username: user.username,
              avatar: user.avatar,
            })
          : Alert.alert('Error', 'User object is missing');
      }}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              user !== undefined
                ? user.avatar
                : 'https://images.unsplash.com/photo-1608232277615-1fe46b66ebcf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          }}
        />
        <View style={styles.userData}>
          <Text style={styles.username}>
            {console.log(currentUser.uid)}
            {user !== undefined
              ? userId === currentUser.uid
                ? 'You'
                : user.username
              : 'Username missing'}
          </Text>
          <Text style={styles.date}>
            {user !== undefined
              ? new Date(user.createdAt).toLocaleString()
              : 'not mentioned'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
