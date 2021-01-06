import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
export default function HomeButtonBar() {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: 'gray',
      width: '100%',
    },
  });
  return (
    <View style={styles.container}>
      <Pressable>
        <Text> Profile </Text>
      </Pressable>
      <Pressable>
        <Text> Logout </Text>
      </Pressable>
    </View>
  );
}
