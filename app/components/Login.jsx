import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS} from './__styleVars';
export default function Login({navigation}) {
  const Styles = StyleSheet.create({
    input: {
      borderRadius: 30,
      borderColor: COLORS.primary,
      borderWidth: 2,
      marginTop: 10,
      color: COLORS.black,
      width: 250,
    },
    loginText: {
      textAlign: 'center',
      fontSize: 24,
      color: COLORS.black,
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
    if (email.length > 0 || password.length > 0) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError('Email and Password are required to login');
    }
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={Styles.loginText}>Login</Text>
        <Text style={{color: COLORS.black}}>
          {' '}
          If you don't have an account{' '}
          <Text
            style={{color: COLORS.primary, opacity: 0.9}}
            onPress={() => navigation.navigate('Signup')}>
            {' '}
            register{' '}
          </Text>{' '}
        </Text>
        <TextInput
          placeholderTextColor={COLORS.black}
          placeholder="Your Email"
          style={Styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Your password"
          placeholderTextColor={COLORS.black}
          style={Styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {error.length > 0 && setTimeout(() => setError(''), 6000) && (
          <Text style={{color: COLORS.danger, width: 250}}> {error} </Text>
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
