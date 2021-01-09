import React from 'react';
import {View, StyleSheet, Pressable, Text, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import ImagePicker from 'react-native-image-crop-picker';
import InserPictureSVG from './svgs/InserPictureSVG';
import PhotoCameraSVG from './svgs/PhotoCameraSVG';
export default function ChatAction() {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: COLORS.grey,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
  });
  const getImage = () => {
    // Get user image from Gallery
    ImagePicker.openPicker({
      width: 500,
      height: 600,
      mediaType: 'photo',
    })
      .then((image) => console.log(image))
      .catch((err) => Alert.alert('Error', err.message));
  };
  const takeImage = () => {
    // Let user take picture with camera
    ImagePicker.openCamera({
      mediaType: 'photo',
      width: 500,
      height: 600,
    })
      .then((image) => console.log(image))
      .catch((err) => Alert.alert('Error', err.message));
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => getImage()}>
        <InserPictureSVG />
      </Pressable>
      <Pressable onPress={() => takeImage()}>
        <PhotoCameraSVG />
      </Pressable>
    </View>
  );
}
