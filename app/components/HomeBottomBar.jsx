import React from 'react';
import {View, StyleSheet, Pressable, Text, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import auth from '@react-native-firebase/auth';
export default function HomeButtonBar({navigation}) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: COLORS.white,
      width: '100%',
      paddingVertical: 10,
      elevation: 4,
      shadowColor: COLORS.black,
      shadowOffset: {
        height: 10,
        width: 5,
      },
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text> Profile </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          auth()
            .signOut()
            .then(() => Alert.alert('Logout', 'Logged out successfuly'))
            .catch((err) => Alert.alert('Error', err.message))
        }>
        <Text> Logout </Text>
      </Pressable>
    </View>
  );
}
