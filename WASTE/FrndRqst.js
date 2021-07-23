/*{import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export function FrndRqst({ navigation }) {
  const [data, setData] = React.useState([]);
  const user = auth.currentUser.displayName;

  React.useEffect(() => {
    FR();
    console.log("FR")
  }, [FR]);

  const FR = React.useCallback(() => {
    let arr = [];
    db.collection('users')
      .doc(user)
      .get()
      .then((snapshot) => {
        let x = snapshot.data().rqstlist;
        arr = arr.concat(x);
        setData(arr);
      });
  }, [user]);

  function accept(item) {
    let ct = db
      .collection('users')
      .doc(user)
      .update({
        contacts: firebase.firestore.FieldValue.arrayUnion(item),
      });
    let ct1 = db.collection('users').doc(user).update({
      rqstlist: firebase.firestore.FieldValue.arrayRemove(item)
    })
    console.log("Added "+item+" to frnd list")
    FR();
  }

  const row = ({ item }) => (
    <View style={styles.vw}>
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
      <Text>{'                                   '}</Text>
      <View>
        <Button title="ACCEPT" color="#32cd32" onPress={() => accept(item)} />
      </View>
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
          {'FRIEND RQST'}{' '}
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