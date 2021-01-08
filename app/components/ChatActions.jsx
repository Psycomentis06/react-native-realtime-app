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
    },
  });
  return (
    <View>
      <Pressable>
        <Text> AddImage </Text>
      </Pressable>
      <Pressable>
        <Text> TakeImage </Text>
      </Pressable>
    </View>
  );
}
