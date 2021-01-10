import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Bug() {
  const styles = StyleSheet.create({
    container: {},
  });
  return (
    <View style={styles.container}>
      <Text>
        The app is at first steps (BETA) so you will face some fancy BuGs 😎.{' '}
      </Text>
      <Text>
        So please if you encoured any bug report it so we can fix it. Thanks
        (●'◡'●)
      </Text>
    </View>
  );
}
