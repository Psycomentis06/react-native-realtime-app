import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import {COLORS} from './__styleVars';
export default function UserItem({user, userId, navigation}) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
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
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
      flexShrink: 1,
    },
    date: {
      fontSize: 12,
      color: COLORS.grey,
      textAlign: 'right',
    },
    userData: {
      width: 170,
    },
  });
  return (
    <Pressable
      onPress={() => {
        userId !== undefined
          ? navigation.navigate('Chat', {
              userId: userId,
              username: user.username,
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
            {' '}
            {user !== undefined ? user.username : 'Username missing'}{' '}
          </Text>
          <Text style={styles.date}>
            {' '}
            {user !== undefined
              ? new Date(user.createdAt).toLocaleString()
              : 'not mentioned'}{' '}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
