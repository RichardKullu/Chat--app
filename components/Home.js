import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from 'react-native';
import { auth, fb, db } from '../firebase';
import LinearGradient from 'react-native-web-linear-gradient';
var CryptoJS = require('crypto-js');
import Icon from 'react-native-vector-icons/Ionicons';

export function Home({ navigation }) {
  var hash = CryptoJS.SHA1('Message');
  let hu = hash.toString(CryptoJS.enc.Base64);
  let name = auth.currentUser.displayName;
  console.log(name)
  let imgSrc = '';
  let email = auth.currentUser.email;

  const signOut = React.useCallback(() => {
    auth.signOut().then(() => {
      navigation.replace('Login');
      console.log('Logged out');
    }, [navigation]);
  }, [navigation]);

  function Grd() {
    return (
      <View>
        <LinearGradient
          colors={['black', 'white']}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}></LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>

        <Icon name="person-circle-outline" size={120} color="#318CE7" />
        <View>
        <Text style={styles.txt}> Name: {name} </Text>
        <Text style={[styles.txt, {fontSize: 25}]}> Email: {email}
        </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'flex-start'
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#318CE7',
    margin: 10,
    color: 'black'
  },
});

/*

<ImageBackground
        style={{ flex: 1 }}
        source={{ uri: (imgSrc) }}
        blurRadius={1}>
      <LinearGradient
        colors={[
          'white',
          '#09d6f7',
          '#09baf7',
          '#09a1f7',
          '#0982f7',
          '#0963f7',
          '#0943f7',
        ]}
        start={{ x: 10, y: 10 }}
        end={{ x: 10, y: 20 }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        */
