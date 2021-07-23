import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import { auth, fb } from '../firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

let db = fb.firestore();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Group({ navigation }) {
  const [dt, setDt] = React.useState('');
  const [text, setText] = React.useState('');
  const [gname, setGname] = React.useState('');

  let user = auth.currentUser.displayName;

  React.useEffect(() => {
    let du = db.collection('users').doc(user);

    du.onSnapshot((snap) => {
      let arr = [];
      let y = snap.data().grps;
      y.forEach((snap1) => {
        let h = snap1.name;
        arr.push(h);
      });
      setDt(arr);
    });
  }, [user]);

  function add() {
    let du = db
      .collection('users')
      .doc(user)
      .update({
        grps: firebase.firestore.FieldValue.arrayUnion({ name: text }),
      });
    let du2 = db
      .collection('groups')
      .doc(text)
      .set({
        name: text,
        admin: user,
        members: firebase.firestore.FieldValue.arrayUnion(user),
      });
    setText('');
  }

  function goToGroupChat({ item }) {
    console.log(item);
    navigation.navigate('GroupChat', {
      name: item,
    });
  }
  const rdr = ({ item }) => {
    return (
      <View>
      <View style={styles.its}></View>
        <TouchableOpacity onPress={() => goToGroupChat({ item })}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth,
            }}>
            <MaterialCommunityIcons
              name="chat"
              color={'black'}
              size={40}
              style={{
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                fontWeight: 800,
                fontSize: 30,
                marginLeft: 30,
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const Title = () => {
    return (
      <View style={[styles.top, { margin: 10 }]}>
        <Text
          style={{
            fontWeight: 800,
            fontSize: 40,
            marginLeft: 20,
          }}>
          GROUPS
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View>
        <View style={styles.its}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Title />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          margin: 15,
          borderWidth: 1,
          borderRadius: 40,
          borderColor: 'grey',
        }}>
        <MaterialCommunityIcons
          name="account-multiple-plus"
          color={'grey'}
          size={38}
          style={{
            marginLeft: 5,
          }}
        />
        <TextInput
          multiline
          style={styles.box}
          onChangeText={(msg) => setText(msg)}
          value={text}
          placeholder="Add group..."
        />
        <MaterialCommunityIcons
          name="send-circle"
          color={'#09a1f7'}
          size={40}
          style={{
            marginRight: 5,
          }}
          onPress={() => add()}
        />
      </View>
      <FlatList
        data={dt}
        renderItem={rdr}
        keyExtractor={(item) => item.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
  },
  top: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  its: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'bottom',
    paddingTop: 10,
    paddingLeft: 15,
    height: 40,
    borderColor: 'black',
    margin: 8,
  },
});
