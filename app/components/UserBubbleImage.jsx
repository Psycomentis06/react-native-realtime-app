import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {COLORS} from './__styleVars';
export default function UserBubbleImage({message}) {
  const styles = StyleSheet.create({
    bubble: {
      width: '70%',
      backgroundColor: COLORS.warning,
      flexShrink: 1,
      marginTop: 10,
      fontSize: 16,
      padding: 10,
      borderRadius: 10,
      color: COLORS.white,
      marginLeft: 'auto',
    },
    image: {
      width: '70%',
      height: 350,
    },
  });
  return (
    <View style={styles.bubble}>
      <Image
        source={{uri: message.item.message.message}}
        style={styles.image}
      />
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
