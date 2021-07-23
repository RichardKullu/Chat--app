import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { auth, fb } from '../firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-web-linear-gradient';

let db = fb.firestore();

export function AddGroup({ navigation, route }) {
  const [pname, setPname] = React.useState([]);
  let user = auth.currentUser.displayName;
  let grp = route.params.id;
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);

  React.useEffect(() => {
    let data = db.collection('users');
    let data2 = db.collection('groups').doc(grp);
    let arr = [];
    data2.onSnapshot((snap) => {
      let y = snap.data().members;
      y.forEach((snap1) => {
        let h = snap1;
        arr.push(h);
      });
      console.log(arr);
    });
    data.onSnapshot((querySnapshot) => {
      let arx = [];
      querySnapshot.forEach((snap) => {
        let name = snap.id;
        if (arr.includes(name)) {
          console.log('Already a member : ', name);
        } else {
          arx.push(name);
        }
      });
      console.log(arx);
      setFilteredDataSource(arx);
      setMasterDataSource(arx);
    });
  }, [grp, user]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blan

    if (text) {
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item;
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  function addMember({ item }) {
    let dt3 = db.collection('groups').doc(grp);
    let dt4 = db.collection('users').doc(item);
    dt3.update({
      members: firebase.firestore.FieldValue.arrayUnion(item),
    });
    dt4.update({
      grps: firebase.firestore.FieldValue.arrayUnion({
        name: grp,
      }),
    });
  }

  function add() {
    let dt = db.collection('groups').doc(grp);
    dt.update({
      members: firebase.firestore.FieldValue.arrayUnion({
        name: pname,
      }),
    });
    console.log('Added person : ', pname);
    setPname('');
  }

  const renderItem = ({ item }) => {
    return (
      <SafeAreaView>
        <View style={styles.its} />
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '8%',
          }}>
          <TouchableOpacity onPress={() => addMember({ item })}>
            <Bttn />
          </TouchableOpacity>
          <Icon name="people-circle-outline" size={48} color={'#0CAFFF'} />
          <Text style={styles.itemStyle}>{item}</Text>   
        </View>
      </SafeAreaView>
    );
  };

  const Bttn = () => {
    return (
      <View style={{
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <View style={styles.box}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            ADD
          </Text>
        </View>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#0CAFFF',
    backgroundColor: '#FFFFFF',
  },
  its: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  box: {
    height: 30,
    width: 55,
    marginLeft: '180%',
    backgroundColor: '#2ecc71',
    margin: 8,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
