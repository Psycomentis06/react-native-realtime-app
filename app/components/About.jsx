import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from './__styleVars';

export default function About() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: COLORS.grey,
    },
    paragraph: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 20,
      color: COLORS.primary,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is a Realtime chat application with React Native Framework and
        Google is firebase platform created by Ali Amor.
      </Text>
      <Text style={styles.paragraph}>
        This app is a mini-project to show what you can do with react native and
        with what you learned from the university concerning React Native
        Framework.
      </Text>
    </View>
  );
}
