// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { fb, auth } from '../firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
var CryptoJS = require('crypto-js');

let db = fb.firestore();

export const NewContact = ({ navigation }) => {
  let user = auth.currentUser.displayName;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    let data = db.collection('users');
    data.onSnapshot((querySnapshot) => {
      let arx = [];
      querySnapshot.forEach((snap) => {
        let name = snap.id;
        if (name !== user) arx.push(name);
      });
      setFilteredDataSource(arx);
      setMasterDataSource(arx);
    });
  }, [user]);

  function gotochatScreen(prsn) {
    navigation.navigate('ChatScreen', {
      item: prsn,
    });
  }

  function createChat({ item }) {
    let str = user + item;
    console.log(str);
    function cmp(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    str = str.split('').sort(cmp).join('');
    console.log(str);
    let hash = CryptoJS.SHA1(str);
    let text = hash.toString(CryptoJS.enc.Base64);
    var dataString = text
      .replace(/\+/g, 'p1L2u3S')
      .replace(/\//g, 's1L2a3S4h')
      .replace(/=/g, 'e1Q2u3A4l');
    console.log(dataString);

    navigation.navigate('ChatScreen', {
      item: dataString,
      prsn: item,
    });

    //Add docs with chat id as text in chats and
    //Navigate to chat screen with params as item
  }

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

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => createChat({ item })}>
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
  };

  const ItemSeparatorView = () => {
    return (

        <View style={styles.its}></View>

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
          People
        </Text>
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
          borderRadius: 30,
          borderColor: 'grey',
        }}>
        <MaterialCommunityIcons
          name="account-search"
          color={'grey'}
          size={30}
          style={{
            marginLeft: 30
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search Here"
        />
      </View>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
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
    borderColor: 'transparent',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  its: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});
