import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Clipboard from '@react-native-community/clipboard';
export default function ActionPopover({itemId, roomId, message, isOpen}) {
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
    soon: {
      color: COLORS.white,
      opacity: 0.5,
    },
    wrapper: {
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
    },
  });
  const removeMessage = () => {
    const itemRef = database()
      .ref('rooms')
      .child(roomId + '/' + itemId);
    // check if it's an image
    itemRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const msgType = snapshot.val().msgType;
        if (msgType === 'text') {
          // delete node and nothing else
          itemRef.remove();
        } else if (msgType === 'photo') {
          // delete node + delte photo from firebase Bucket
          storage()
            .ref('images')
            .child(snapshot.val().fileName)
            .delete()
            .then((response) => {
              // after file deleted from bucket delete firebase node
              itemRef.remove();
              console.log('image deleted');
            })
            .catch((err) => Alert.alert('Error', err.message));
        }
      }
    });
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => removeMessage()}>
          Delete
        </Text>
        <Text
          style={styles.text}
          onPress={() => (message ? Clipboard.getString(message) : null)}>
          Copy
        </Text>
        <Text
          style={styles.soon}
          onPress={() =>
            Alert.alert(
              'Soon',
              'This feature will be available soon in future versions',
            )
          }>
          Hide
        </Text>
        <Text
          style={styles.soon}
          onPress={() =>
            Alert.alert(
              'Soon',
              'This feature will be available soon in future versions',
            )
          }>
          Close
        </Text>
      </View>
    </View>
  );
}
