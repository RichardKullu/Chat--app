/*{import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var CryptoJS = require('crypto-js');

export function Chatz({ navigation }) {
  
  var hash = CryptoJS.SHA1('Message');
  let hu = hash.toString(CryptoJS.enc.Base64);

  function xu() {
    console.log(hu);
  }
  
  let ch = React.useRef([]);
  let data = ['234'];
  function gotochatScreen(item) {
    navigation.navigate('ChatScreen', {
      name: user,
      item: '235',
    });
  }

  const row = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.vw}
        onPress={() => gotochatScreen(item.id)}>
        <Icon name="person-circle-outline" size={40} color="steelblue" />
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            marginLeft: 10,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );

  React.useEffect(() => {
    let data = db.collection('users').doc(user).collection('chats');
    data.onSnapshot((querySnapshot) => {
      let ty = [];
      querySnapshot.forEach((snap) => {
        let yu = snap.get('id');
        console.log(yu);
        ty = ty.concat(yu);
      });
    });
  }, [ch, user]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 30,
            marginLeft: 10,
          }}>
          {'   '}
          {'CHATS'}{' '}
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>{'                 '}</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={row}
        keyExtractor={(item) => item.toString}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
  },
  vw: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 20,
  },
});
}*/