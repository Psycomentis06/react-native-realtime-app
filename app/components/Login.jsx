import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS} from './__styleVars';
export default function Login({navigation}) {
  const Styles = StyleSheet.create({
    input: {
      borderRadius: 30,
      borderColor: '#3742fa',
      borderWidth: 2,
      marginTop: 10,
      color: 'white',
      width: 250,
    },
    loginText: {
      textAlign: 'center',
      fontSize: 24,
      color: 'whitesmoke',
      fontWeight: 'bold',
    },
    loginBtn: {
      width: 200,
      padding: 10,
      color: 'white',
      borderRadius: 15,
      backgroundColor: COLORS.primary,
      textAlign: 'center',
      marginTop: 10,
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = (email, password) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.navigate('Home');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f3542',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={Styles.loginText}>Login</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Your Email"
          style={Styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Your password"
          placeholderTextColor="white"
          style={Styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {error.length > 0 && setTimeout(() => setError(''), 10000) && (
          <Text> {error} </Text>
        )}
        <Pressable onPress={() => login(email, password)}>
          <Text style={Styles.loginBtn}>
            {' '}
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              'Login'
            )}{' '}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
