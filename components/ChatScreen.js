import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import { auth, fb } from '../firebase';
import firebase from 'firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import LinearGradient from 'react-native-web-linear-gradient';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let db = fb.firestore();

export function ChatScreen({ navigation, route }) {
  let user = auth.currentUser.displayName;
  let chat_id = route.params === undefined ? 'null' : route.params.item;
  let prsn = route.params === undefined ? 'null' : route.params.prsn;
  let str = chat_id;
  const [msg, setMsg] = React.useState('');
  const [msg1, setMsg1] = React.useState([]);
  let img =
    'https://firebasestorage.googleapis.com/v0/b/msngr-cb3ae.appspot.com/o/tunafish-mayonnaise-qtbjuRHMlTM-unsplash.jpg?alt=media&token=16232409-e41f-4bf5-ac61-526a497d08e9';

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

  useFocusEffect(
    React.useCallback(() => {
      if (route.params === undefined) {
        navigation.goBack();
      }
      if (chat_id !== undefined) {
        let dt = db
          .collection('msgs')
          .doc(str)
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
              if (user !== prsn) {
                coloridx = numx >= 15 ? (numx -= 15) : numx++;
              }
              data = { user, prev, txt, timestamp, coloridx };
              arr.push(data);
              prev = doc.data().user;
            });
            setMsg1(arr);
          });
        return () => dt;
      }
    }, [route.params, navigation, chat_id, prsn, str])
  );

  const Hdr = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}>
        <Image
          source={{
            uri:
              'https://img-premium.flaticon.com/png/512/1177/1177568.png?token=exp=1621331437~hmac=40bced4e28a47b3f42f00763fa508a53',
          }}
          style={{
            height: 50,
            width: 50,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'arial',
            color: 'white',
          }}>
          {prsn}
        </Text>
      </View>
    );
  };

  const Title = () => {
    return (
      <View style={[styles.top, { margin: 6 }]}>
        <LinearGradient
          colors={['powderblue', '#318CE7', 'pink']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            borderRadius: 5
          }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 25,
              marginLeft: 20,
              color: 'white',
            }}>
            {prsn}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  function Grd1() {
    return (
      <ImageHeaderScrollView
        maxHeight={200}
        minHeight={40}
        headerImage={img}
        renderForeground={() => (
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => console.log('tap!!')}>
              <Text style={{ backgroundColor: 'transparent' }}>Tap Me!</Text>
            </TouchableOpacity>
          </View>
        )}>
        <View style={{ height: 1000 }}>
          <TriggeringView onHide={() => console.log('text hidden')}>
            <Text>Scroll Me!</Text>
          </TriggeringView>
        </View>
      </ImageHeaderScrollView>
    );
  }

  function Grd() {
    return (
      <LinearGradient
        colors={['powderblue', 'pink']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1000,
          elevation: 1000,
          position: 'absolute',
        }}
      />
    );
  }

  function Btn() {
    return (
      <View>
        <Icon
          name="person-circle-outline"
          size={40}
          color="powderblue"
          style={{ marginRight: 20 }}
        />
      </View>
    );
  }

  const SendText = (async) => {
    if (msg.length > 0) {
      var msgs = {
        txt: msg,
        user: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      db.collection('msgs/' + str + '/texts').add(msgs);
      setMsg('');
    } else {
      console.log('Enter Text');
    }
  };

  const rdr = ({ item }) => {
    let date = item.timestamp;
    if (item.user == user) {
      if (item.prev == 'null') {
        return (
          <View style={[styles.me, { backgroundColor: colr[item.coloridx] }]}>
            <Text style={styles.txt}>{item.txt}</Text>
          </View>
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
    if (item.user == prsn) {
      if (item.prev == item.user) {
        return (
          <View style={[styles.that, { marginTop: -7 }]}>
            <Text style={styles.txtWa}> {item.txt}</Text>
          </View>
        );
      }
      if (item.prev !== item.user) {
        return (
          <View style={styles.that}>
            <Text style={styles.txtWa}> {item.txt}</Text>
          </View>
        );
      }
    }
  };

  function goBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <FlatList
        data={msg1}
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
          color={'black'}
          size={45}
          onPress={SendText}
        />
      </View>
    </SafeAreaView>
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
    margin: 10,
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
    fontWeight: '400',
    fontFamily: 'Arial',
  },
});
