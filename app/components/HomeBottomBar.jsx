import React from 'react';
import {View, StyleSheet, Pressable, Text, Alert} from 'react-native';
import {COLORS} from './__styleVars';
import auth from '@react-native-firebase/auth';
import ProfileSVG from './svgs/UserProfileSVG';
import LogoutSVG from './svgs/LogoutSVG';
import BugSVG from './svgs/BugSVG';
import AboutSVG from './svgs/AboutSVG';
export default function HomeButtonBar({navigation}) {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: COLORS.grey,
      width: '100%',
      paddingVertical: 10,
      elevation: 4,
      shadowColor: COLORS.black,
      shadowOffset: {
        height: 10,
        width: 5,
      },
    },
    buttons: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 10,
      elevation: 5,
      shadowColor: COLORS.black,
      shadowOffset: {
        height: 10,
        width: 5,
      },
    },
  });
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.buttons}
        onPress={() => navigation.navigate('Profile')}>
        <ProfileSVG color={COLORS.white} />
      </Pressable>
      <Pressable
        style={styles.buttons}
        onPress={() =>
          auth()
            .signOut()
            .then(() => Alert.alert('Logout', 'Logged out successfuly'))
            .catch((err) => Alert.alert('Error', err.message))
        }>
        <LogoutSVG color={COLORS.white} />
      </Pressable>
      <Pressable
        style={styles.buttons}
        onPress={() => navigation.navigate('Report')}>
        <BugSVG color={COLORS.white} />
      </Pressable>
      <Pressable
        style={styles.buttons}
        onPress={() => navigation.navigate('About')}>
        <AboutSVG color={COLORS.white} />
      </Pressable>
    </View>
  );
}
