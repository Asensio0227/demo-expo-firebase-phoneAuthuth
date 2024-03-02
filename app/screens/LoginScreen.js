import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { useRef, useState } from 'react';
import { firebaseConfig } from '../../config';
import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const recaptchaVerifiedRef = useRef(null);
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifiedRef.current)
      .then(setConfirm);
    setPhoneNumber('');
  };

  const confirmCode = () => {
    try {
      const credentials = firebase.auth.PhoneAuthProvider.credential(
        confirm,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          setCode('');
        });

      navigation.navigate('TabTwo', { code });
    } catch (error) {
      console.log('Invalid credentials', error);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifiedRef}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      {!confirm ? (
        <>
          <Text style={styles.text}> login using otp</Text>
          <TextInput
            placeholder='phone number with your country code e.g +27'
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            autoComplete='tel'
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => sendVerification()}
            style={styles.send}
          >
            <Text style={styles.btn}>send</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}> login using otp</Text>
          <TextInput
            placeholder='phone number with your country code e.g +27'
            onChangeText={setCode}
            keyboardType='phone-pad'
            autoComplete='tel'
            style={styles.input}
          />
          <TouchableOpacity onPress={() => confirmCode()} style={styles.send}>
            <Text style={styles.btn}>confirm</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    textTransform: 'capitalize',
    fontWeight: '900',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderRadius: 25,
    fontSize: 18,
    backgroundColor: '#f8f4f4',
  },
  btn: {
    backgroundColor: '#fc5c65',
    color: '#fff',
    padding: 15,
    textTransform: 'capitalize',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
  },
});
