import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from './__styleVars';
/**
 * Create Action popover to delete message basically
 * @param {number} itemId Action to perform for that item
 * @param {string} roomId Room to get the item from
 * @param {boolean} isOpen True to set component visible default is false
 */
export default function ActionPopover({itemId, roomId, isOpen}) {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: COLORS.black,
      borderRadius: 15,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      display: isOpen || false ? 'flex' : 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text> Delete </Text>
      <Text> Reply </Text>
      <Text> Hide </Text>
      <Text> Close </Text>
    </View>
  );
}
