import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from './__styleVars';
import {AVATARS} from './__usersAvatars';
export default function Signup({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.black,
    },
    content: {
      backgroundColor: COLORS.white,
      padding: 20,
      borderRadius: 15,
      elevation: 2,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    title: {
      fontSize: 30,
      color: COLORS.black,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      width: 250,
      textAlign: 'justify',
      color: COLORS.black,
      opacity: 0.7,
      marginTop: 5,
    },
    insteadWord: {
      color: COLORS.primary,
    },
    input: {
      borderRadius: 30,
      borderColor: COLORS.primary,
      borderWidth: 2,
      marginTop: 10,
      color: COLORS.black,
      width: 250,
    },
    registerBtn: {
      opacity: loading ? 0.8 : 1,
      width: 200,
      padding: 10,
      color: 'white',
      borderRadius: 15,
      backgroundColor: COLORS.primary,
      textAlign: 'center',
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    error: {
      color: COLORS.danger,
      fontWeight: 'bold',
      width: 250,
    },
  });

  // input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  // Create account
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const register = (email, password, name) => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // user created now we save other data in realtime database
        database()
          .ref('users')
          .child(user.user.uid)
          .set({
            createdAt: database.ServerValue.TIMESTAMP,
            username: name,
            email: user.user.email,
            avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
          })
          .then((snapshot) => navigation.navigate('Home'))
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}> Register </Text>
        <Text style={styles.subtitle}>
          {' '}
          You can create an account using your facebook account gmail or using
          Email and password. if you already have one login{' '}
          <Text
            style={styles.insteadWord}
            onPress={() => navigation.navigate('Home')}>
            {' '}
            instead.{' '}
          </Text>
        </Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Pressable
          disabled={loading === true ? true : false}
          onPress={() => {
            if (
              username.length > 0 &&
              email.length > 0 &&
              password.length > 0
            ) {
              setTimeout(() => {
                setLoading(true);
                register(email, password, username);
              }, 500);
            } else {
              setError('Email or password or username empty');
            }
          }}>
          {error.length > 0 && setTimeout(() => setError(''), 5000) && (
            <Text style={styles.error}> {error} </Text>
          )}
          <Text style={styles.registerBtn}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              'Login'
            )}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
