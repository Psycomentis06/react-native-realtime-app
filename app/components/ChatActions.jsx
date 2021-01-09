import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import InserPictureSVG from './svgs/InserPictureSVG';
import PhotoCameraSVG from './svgs/PhotoCameraSVG';
import * as Progress from 'react-native-progress';
export default function ChatAction({user, roomId}) {
  const [uploadImage, setUploadImage] = useState(0);
  const [getImagePress, setGetImagePress] = useState(false);
  const [takePicturePress, setTakePicturePress] = useState(false);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: COLORS.grey,
      paddingVertical: 10,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
    },
    content: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    bar: {
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    takePicture: {
      padding: 10,
      backgroundColor: takePicturePress ? COLORS.primary : 'transparent',
      borderRadius: 10,
    },
    getImage: {
      padding: 10,
      backgroundColor: getImagePress ? COLORS.primary : 'transparent',
      borderRadius: 10,
    },
  });
  const sendMessage = (image) => {
    const imageExtention = image.path;
    const splittedPath = imageExtention.split('/');
    const fileName = splittedPath[splittedPath.length - 1];
    //const fileExtention = fileName.split('.')[1];
    const imageRef = storage()
      .ref('images')
      .child(fileName + Math.floor(Math.random()) * 10000);
    const imagePut = imageRef.putFile(image.path);
    imagePut.on('state_changed', (response) => {
      setUploadImage(response.bytesTransferred / response.totalBytes); // progress bar
    });
    imagePut.then((response) => {
      setTimeout(() => setUploadImage(0), 2000); // reset progress bar after 2000 ms
      if (response.state === 'success') {
        // now we send the message
        imagePut.snapshot.ref.getDownloadURL().then((url) =>
          database().ref('rooms').child(roomId).push({
            message: url,
            sender: user.uid,
            createdAt: database.ServerValue.TIMESTAMP,
            msgType: 'photo',
          }),
        );
      } else if (response.state === 'error') {
        Alert.alert('Error', response.error.message);
      }
    });
  };
  const getImage = () => {
    // Get user image from Gallery
    ImagePicker.openPicker({
      width: 500,
      height: 600,
      mediaType: 'photo',
    })
      .then((image) => sendMessage(image))
      .catch((err) => Alert.alert('Error', err.message));
  };
  const takeImage = () => {
    // Let user take picture with camera
    ImagePicker.openCamera({
      mediaType: 'photo',
      width: 500,
      height: 600,
    })
      .then((image) => sendMessage(image))
      .catch((err) => Alert.alert('Error', err.message));
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          style={styles.getImage}
          onPress={() => {
            getImage();
            setGetImagePress(true);
            setTimeout(() => setGetImagePress(false), 300);
          }}>
          <InserPictureSVG color={getImagePress ? COLORS.white : null} />
        </Pressable>
        <Pressable
          style={styles.takePicture}
          onPress={() => {
            takeImage();
            setTakePicturePress(true);
            setTimeout(() => setTakePicturePress(false), 300);
          }}>
          <PhotoCameraSVG color={takePicturePress ? COLORS.white : null} />
        </Pressable>
      </View>
      {uploadImage > 0 && (
        <Progress.Bar style={styles.bar} progress={uploadImage} width={250} />
      )}
    </View>
  );
}
