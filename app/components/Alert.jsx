import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from './__styleVars';
export default function ({color, title, text, textColor, ...rest}) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'normal',
      color: textColor,
    },
    text: {
      fontSize: 20,
      color: textColor,
      opacity: 0.9,
    },
    container: {
      backgroundColor: color ? color : COLORS.primary,
      opacity: 0.8,
      borderRadius: 15,
      borderColor: color ? color : COLORS.primary,
      borderWidth: 2,
    },
  });
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.text}> {text} </Text>
    </View>
  );
}
