import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { auth, fb } from '../firebase';
import firebase from 'firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let db = fb.firestore();

export function GroupChat({ navigation, route }) {
  let userx = auth.currentUser.displayName;
  let groupChat = route.params.name;
  const [msg, setMsg] = React.useState('');
  const [dt, setDt] = React.useState([]);

  let colr = [
    '#3A9CD1',
    '#3B83D1',
    '#3B69D1',
    '#3B4FD1',
    '#403BD1',
    '#5A3BD1',
    '#743BD1',
    '#8D3BD1',
    '#743BD1',
    '#5A3BD1',
    '#403BD1',
    '#3B4FD1',
    '#3B69D1',
    '#3B83D1',
    '#3A9CD1',
  ];

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: groupChat,
      headerRight: (props) => <Right />,
    });
    let dx = db
      .collection('groups')
      .doc(groupChat)
      .collection('texts')
      .orderBy('timestamp')
      .onSnapshot((querySnapshot) => {
        let arr = [];
        let prev = 'null';
        let numx = 0;
        querySnapshot.forEach((doc) => {
          let data;
          let txt = doc.data().txt;
          let timestamp = doc.data().timestamp.seconds;
          let user = doc.data().user;
          let coloridx = 'null';
          if (user == userx) {
            coloridx = numx >= 15 ? (numx -= 15) : numx++;
          }
          data = { user, prev, txt, timestamp, coloridx };
          arr.push(data);
          prev = doc.data().user;
        });
        setDt(arr);
      });
    return dx;
  }, [navigation, userx, groupChat]);

  const SendText = () => {
    if (msg.length > 0) {
      var msgs = {
        txt: msg,
        user: userx,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      db.collection('groups/' + groupChat + '/texts').add(msgs);
      setMsg('');
    } else {
      console.log('Empty text');
    }
  };

  function addmember() {
    console.log('Adding a member...');
    navigation.navigate('AddGroup', { id: groupChat });
  }

  function groupinfo() {
    navigation.navigate('GroupInfo', {
      id: groupChat,
    });
  }

  function Right() {
    return (
      <View
        style={{
          margin: 8,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => groupinfo()}>
          <View
            style={{
              margin: 8,
            }}>
            <MaterialCommunityIcons
              name="information"
              color={'white'}
              size={30}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addmember()}>
          <View
            style={{
              margin: 8,
            }}>
            <MaterialCommunityIcons name="pencil" color={'white'} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const rdr = ({ item }) => {
    let date = item.timestamp;
    if (item.user == userx) {
      if (item.prev == 'null') {
        return (
          <TouchableOpacity onPress={() => alert('Touched')}>
            <View style={[styles.me, { backgroundColor: colr[item.coloridx] }]}>
              <Text style={styles.txt}>{item.txt}</Text>
            </View>
          </TouchableOpacity>
        );
      }
      if (item.prev == item.user) {
        return (
          <View
            style={[
              styles.me,
              { marginTop: -7, backgroundColor: colr[item.coloridx] },
            ]}>
            <Text style={styles.txt}>{item.txt}</Text>
          </View>
        );
      }
      if (item.prev !== item.user) {
        return (
          <View style={[styles.me, { backgroundColor: colr[item.coloridx] }]}>
            <Text style={styles.txt}>{item.txt}</Text>
          </View>
        );
      }
    }
    if (item.user !== userx) {
      if (item.prev == item.user) {
        return (
          <View style={[styles.that, { marginTop: 1, marginLeft: 42 }]}>
            <Text style={styles.txtWa}> {item.txt} </Text>
          </View>
        );
      }
      if (item.prev !== item.user) {
        return (
          <View>
            <View>
              <Text
                style={{
                  marginLeft: 8,
                  color: 'grey',
                  fontFamily: 'arial',
                  fontSize: 15,
                }}>
                {' '}
                {item.user}{' '}
              </Text>{' '}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <MaterialCommunityIcons
                  name="google-downasaur"
                  color={'#0066b2'}
                  size={30}
                />
              </View>
              <View style={[styles.that, { flexDirection: 'row' }]}>
                <Text style={styles.txtWa}> {item.txt} </Text>
              </View>
            </View>
          </View>
        );
      }
    }
  };

  const Ci = () => {
    return(
      <View>
        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dt}
        style={{ marginBottom: 45 }}
        renderItem={({ item }) => rdr({ item })}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.bottom}>
        <View style={styles.nx}>
          <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={(msg) => setMsg(msg)}
            value={msg}
            placeholder="Send Message"
          />
        </View>
        <MaterialCommunityIcons
          name="send-circle"
          color={'steelblue'}
          size={45}
          onPress={SendText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'stretch',
  },
  input: {
    height: 40,
    width: '100%',
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 0,
  },
  nx: {
    flex: 1,
    borderColor: '#707070',
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 1,
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    textAlign: 'center',
    marginLeft: 15,
  },
  that: {
    alignSelf: 'flex-start',
    margin: 3,
    backgroundColor: '#D0D0D0',
    borderRadius: 10,
    maxWidth: '60%',
    minHeight: 30,
  },
  me: {
    alignSelf: 'flex-end',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#16bed9',
    maxWidth: '60%',
    minHeight: 30,
  },
  txt: {
    margin: 8,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Arial',
  },
  txtWa: {
    margin: 8,
    fontSize: 18,
    color: '#080808',
    fontWeight: '500',
    fontFamily: 'Arial',
  },
});
