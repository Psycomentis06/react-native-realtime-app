import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {COLORS} from './__styleVars';
export default function ChatAction() {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: COLORS.grey,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable>
        <Text> AddImage </Text>
      </Pressable>
      <Pressable>
        <Text> TakeImage </Text>
      </Pressable>
    </View>
  );
}
