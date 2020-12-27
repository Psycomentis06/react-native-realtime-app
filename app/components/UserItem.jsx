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
  });
  return (
    <Pressable
      onPress={() => {
        userId !== undefined
          ? navigation.navigate('Chat', {userId: userId})
          : Alert.alert('Error', 'User object is missing');
      }}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={
            user !== undefined
              ? {
                  uri: user.avatar,
                }
              : {
                  uri:
                    'https://images.unsplash.com/photo-1559838122-814d252e3f33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80',
                }
          }
        />
        <View>
          <Text style={styles.username}>
            {' '}
            {user !== undefined ? user.username : 'Username missing'}{' '}
          </Text>
          <Text style={styles.date}>
            {' '}
            {user !== undefined ? user.createdAt : 'not mentioned'}{' '}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
