import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from './__styleVars';

export default function ActionPopover({itemId, roomId, isOpen}) {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 10,
      backgroundColor: COLORS.scondary,
      borderRadius: 15,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      color: COLORS.white,
    },
    wrapper: {
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
    },
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}> Delete </Text>
        <Text style={styles.text}> Reply </Text>
        <Text style={styles.text}> Hide </Text>
        <Text style={styles.text}> Close </Text>
      </View>
    </View>
  );
}
