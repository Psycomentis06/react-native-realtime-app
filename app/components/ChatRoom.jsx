import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from './__styleVars';
import {FlatList, TextInput} from 'react-native-gesture-handler';
export default function ChatRoom({route, navigation}) {
  const {userId, username, avatar} = route.params;
  // states
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [roomId, setRoomId] = useState('');
  const [newChat, setNewChat] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  // style
  const styles = StyleSheet.create({
    notLoggedcontainer: {
      flex: 1,
      backgroundColor: COLORS.grey,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notLogged: {
      fontSize: 35,
      textAlign: 'center',
      lineHeight: 100,
      padding: 10,
      color: COLORS.danger,
      fontFamily: 'sans-serif-condensed',
    },
    container: {
      position: 'relative',
    },
    chatContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      width: '80%',
    },
    sendBtn: {
      borderRadius: 5,
      backgroundColor: COLORS.primary,
      padding: 10,
    },
    bubble: {
      width: '70%',
      backgroundColor: COLORS.warning,
      flexShrink: 1,
      marginTop: 10,
      fontSize: 16,
      padding: 10,
      borderRadius: 10,
      color: COLORS.white,
      marginLeft: 'auto',
    },
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
    conversation: {
      height: '100%',
      padding: 5,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    actionContainer: {
      display: 'flex',
      flexDirection: 'row',
      borderTopColor: COLORS.grey,
      borderTopWidth: 1,
      alignItems: 'center',
      backgroundColor: COLORS.grey,
    },
    title: {
      fontSize: 25,
      textAlign: 'center',
      color: COLORS.primary,
      fontWeight: 'normal',
    },
  });
  // validate if user logged in
  useEffect(() => {
    navigation.addListener('focus', () => {
      auth().onAuthStateChanged((loggedUser) => {
        if (loggedUser) {
          navigation.setOptions({title: username});
          setUser(loggedUser);
          var localRoomId = '';
          if (loggedUser.uid > userId) {
            setRoomId(loggedUser.uid + userId);
            localRoomId = loggedUser.uid + userId;
          } else {
            setRoomId(userId + loggedUser.uid);
            localRoomId = userId + loggedUser.uid;
          }
          setLoggedIn(true);
          if (localRoomId.length > 0) {
            database()
              .ref('rooms')
              .child(localRoomId)
              .on('value', (snapshot) => {
                if (!snapshot.exists()) {
                  setNewChat(true);
                } else {
                  let chatArray = [];
                  snapshot.forEach((message) => {
                    const messageEl = {
                      id: message.key,
                      message: message.val(),
                    };
                    chatArray.push(messageEl);
                  });
                  setChat(chatArray);
                }
              });
          }
        } else {
          setLoggedIn(false);
        }
        setLoadingPage(false);
      });
    });
  }, [navigation]);
  const addMessage = (message, type) => {
    if (message.length > 0) {
      database()
        .ref('rooms')
        .child(roomId)
        .push(
          {
            message: message,
            sender: user.uid,
            createdAt: database.ServerValue.TIMESTAMP,
            msgType: type,
          },
          (err) => {
            if (err) {
              setError(err.message);
            } else {
              setMessage('');
            }
          },
        );
    } else {
      setError('Message empty');
    }
  };
  if (loadingPage === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={COLORS.success} size="large" />
      </View>
    );
  }
  if (loggedIn === false) {
    return (
      <View style={styles.notLoggedcontainer}>
        <Text style={styles.notLogged}>
          {' '}
          {'You are not logged in please go back to login '}{' '}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: avatar}}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        blurRadius={5}
      />
      <View style={styles.chatContainer}>
        {newChat && <Text style={styles.title}> Say hello to {username} </Text>}
        <FlatList
          contentContainerStyle={styles.conversation}
          data={chat}
          renderItem={(message) => (
            <View
              style={
                message.item.message.sender === user.uid
                  ? styles.bubbleMine
                  : styles.bubble
              }>
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
          )}
          keyExtractor={(message) => message.id}
        />
        {error.length > 0 && setTimeout(() => setError(''), 5000) && (
          <Text style={{color: COLORS.danger}}> {error} </Text>
        )}
        <View style={styles.actionContainer}>
          <TextInput
            placeholderTextColor={COLORS.black}
            placeholder="Send message"
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Pressable
            style={styles.sendBtn}
            onPress={() => addMessage(message, 'text')}>
            <Text style={{color: COLORS.white}}> Send </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
