import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {COLORS} from './__styleVars';
import ActionPopover from './ActionsPopover';
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ActionPopover isOpen={isOpen} />
      <Pressable onLongPress={() => setIsOpen(!isOpen)}>
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
      </Pressable>
    </>
  );
}
