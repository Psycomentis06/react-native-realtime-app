import React from 'react';
import {Text, View} from 'react-native';
export default function ChatRoom({route, navigation}) {
  var userId = '';
  if (route) {
    userId = route.params?.userId;
  }
  return (
    <View>
      <Text>ChatRoom</Text>
      <Text> User Id: {userId} </Text>
    </View>
  );
}
