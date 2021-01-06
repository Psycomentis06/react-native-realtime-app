import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {COLORS} from './__styleVars';
export default function HomeButtonBar() {
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
      <Pressable>
        <Text> Profile </Text>
      </Pressable>
      <Pressable>
        <Text> Logout </Text>
      </Pressable>
    </View>
  );
}
