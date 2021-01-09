import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {COLORS} from './__styleVars';
import ActionPopover from './ActionsPopover';
export default function MineBubbleImage({message}) {
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
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 15,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ActionPopover isOpen={isOpen} />
      <Pressable onLongPress={() => setIsOpen(!isOpen)}>
        <View style={styles.bubbleMine}>
          <View style={{elevation: 5}}>
            <Image
              source={{uri: message.item.message.message}}
              style={styles.image}
            />
          </View>
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
