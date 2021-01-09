import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from './__styleVars';
export default function MineBubbleText({message}) {
  const styles = StyleSheet.create({
    bubbleMine: {
      width: '70%',
      backgroundColor: COLORS.primary,
      flexShrink: 1,
      marginTop: 10,
      fontSize: 16,
      padding: 10,
      borderRadius: 10,
      color: COLORS.white,
    },
  });
  return (
    <View style={styles.bubbleMine}>
      <Text style={{flexShrink: 1, fontSize: 16, color: COLORS.white}}>
        {message.item.message.message}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          color: COLORS.white,
          opacity: 0.7,
        }}>
        {new Date(message.item.message.createdAt).toLocaleString()}
      </Text>
    </View>
  );
}
