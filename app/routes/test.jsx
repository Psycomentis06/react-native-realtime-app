import React from 'react';
import {View, Text, Pressable} from 'react-native';

const s1 = ({navigation}) => {
  return (
    <View>
      <Text> Screen 1 </Text>
      <Pressable onPress={() => navigation.navigate('S2')}>
        <Text> Go to Screen 2 </Text>
      </Pressable>
    </View>
  );
};

const s2 = ({navigation}) => {
  return (
    <View>
      <Text> Screen 2 </Text>
      <Pressable onPress={() => navigation.navigate('S1')}>
        <Text> Go to Screen 1 </Text>
      </Pressable>
    </View>
  );
};

export default {
  s1,
  s2,
};
