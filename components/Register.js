import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { auth, fb, db } from '../firebase';
import GradientButton from 'react-native-gradient-buttons';
import LinearGradient from 'react-native-web-linear-gradient';
import 'expo-haptics';

export function Register({ navigation }) {
  const [emailx, setEmail] = React.useState('@gm.com');
  const [pass, setPass] = React.useState('123456');
  const [namex, setName] = React.useState('');

  function signUpWithEmailPassword() {
    auth
      .createUserWithEmailAndPassword(emailx, pass)
      .then((userCredential) => {
        let userx = userCredential.user;
        userx.updateProfile({
          displayName: namex,
        });
      })
      .then(
        db
          .collection('users')
          .doc(namex)
          .set({
            email: emailx,
            name: namex,
          })
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          })
      )
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('H!', errorCode);
        console.log('fff', errorMessage);
      });
  }

  return (
    <LinearGradient
      colors={['powderblue', 'white', '#87CEEB', 'white', 'pink']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={emailx}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={namex}
        placeholder="name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={pass}
        placeholder="password"
      />
      <GradientButton
        style={{ marginVertical: 8 }}
        textStyle={{ fontSize: 20 }}
        gradientBegin="#0CAFFF"
        gradientEnd="pink"
        gradientDirection="diagonal"
        height="8%"
        width="40%"
        radius={15}
        impact
        impactStyle="Light"
        onPressAction={() => signUpWithEmailPassword()}>
        Register
      </GradientButton>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    margin: 10,
    minHeight: '6%',
    minWidth: '60%',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderColor: '#3E8EDE',
    backgroundColor: 'transparent',
    fontFamily: 'sans-serif',
    shadowRadius: 15,
    shadowColor: '#89CFF0',
  },
});
