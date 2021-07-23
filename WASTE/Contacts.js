/*{import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert 
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

export function Contacts({ navigation, route }) {

  const [data, setData] = React.useState([]);


  React.useEffect(() => {
    CT();
    console.log('CT')
  }, [CT]);

  const CT = React.useCallback(() => {
    let arr = [];
    db.collection('users')
      .doc(user)
      .get()
      .then((snapshot) => {
        let x = snapshot.data().contacts;
        arr = arr.concat(x);
        setData(arr);
      });
  }, [user]);

  function gotochatScreen(item) {
    navigation.navigate('ChatScreen', {
      name: user,
      item: item,
    });
  }

  function newContact() {
    navigation.navigate('NewContact');
  }

  function newChat(item) {
    db.collection('msgs')
      .doc(user + item)
      .collection('texts')
      .orderBy('timestamp')
      .onSnapshot((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let data;
          let txt = doc.data().txt;
          let timestamp = doc.data().timestamp.seconds;
          let user = doc.data().user;
          data = { user, txt, timestamp };
          arr.push(data);
        });
      });
  }

  const row = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.vw}
        onLongPress={() => null}
        onPress={() => gotochatScreen(item)}>
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 30,
            marginLeft: 10,
          }}>
          {'   '}
          {'FRIENDS'}{' '}
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>{'                 '}</Text>
          <Button title="ADD" onPress={() => newContact()} />
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
});}*/
