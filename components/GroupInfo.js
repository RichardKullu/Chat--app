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

let db = fb.firestore();

export function GroupInfo({ navigation, route }) {
  const [pname, setPname] = React.useState([]);
  let user = auth.currentUser.displayName;
  let grp = route.params.id;
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
  const [admin, setAdmin] = React.useState('');

  React.useEffect(() => {
    let xy = db.collection('groups').doc(grp);
    xy.onSnapshot((snap) => {
      let dt2 = snap.data().admin;
      setAdmin(dt2);
    });
    let du = db.collection('groups').doc(grp);
    du.onSnapshot((snap) => {
      let arr = [];
      let y = snap.data().members;
      y.forEach((snap1) => {
        let h = snap1;
        arr.push(h);
      });
      setFilteredDataSource(arr);
      setMasterDataSource(arr);
    });
  }, [admin, grp, user]);


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

  function add() {
    let dt = db.collection('groups').doc(grp).update({
      members: firebase.firestore.FieldValue.arrayUnion(pname),
    });
    console.log('Added person : ', pname);
    setPname('');
  }

  const renderItem = ({ item }) => {
    if (item == undefined) {
      return (
        <View>
          <Text>No person to add</Text>
        </View>
      );
    } else if (item !== undefined) {
      return (
        <View>
          <TouchableOpacity onPress={() => null}>
            <View style={styles.its}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                marginLeft: '8%',
              }}>
              <Icon
                name="people-circle-outline"
                size={48}
                color={'#0CAFFF'}></Icon>
              <Text style={styles.itemStyle}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View>
        <View style={styles.its}></View>
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
          GROUP INFO
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Title />
      <View style={styles.container}>
        <Text style={[styles.grpinfo]}>
          ADMIN: <Text> {admin} </Text>
        </Text>
        <Text style={styles.grpinfo}>GROUP MEMBERS</Text>
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
  top: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  grpinfo: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
    flexDirection: 'row',
    marginTop: 10
  },
});
