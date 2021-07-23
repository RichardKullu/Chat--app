import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../firebase';
import GradientButton from 'react-native-gradient-buttons';
import 'expo-haptics';
import LinearGradient from 'react-native-web-linear-gradient';

export function Login({ navigation, route }) {
  const [email, setEmail] = React.useState('@gm.com');
  const [password, setPass] = React.useState('123456');
  let name;

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Pg');
      }
    });
    return unsubscribe;
  }, [name, navigation]);

  function signInWithEmailPassword() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        name = user.displayName;
        console.log('Signed In: ', name);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  function Grd() {
    return (
      <View>
        <LinearGradient
          colors={['#a13388', '#10356c']}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            height: "100%",
            width: "100%",
          }}></LinearGradient>
      </View>
    );
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
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={password}
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
        onPressAction={() => signInWithEmailPassword()}>
        Login
      </GradientButton>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#2a52be', marginTop: 15 }}>
          No account register here.
        </Text>
      </TouchableOpacity>
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
