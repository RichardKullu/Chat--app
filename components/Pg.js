import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Header,
} from 'react-native';
import { auth, fb } from '../firebase';
import { DrawerActions } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './Home';
import { ChatScreen } from './ChatScreen';
import { NewContact } from './NewContact';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LinearGradient from 'react-native-web-linear-gradient';
import { Group } from './Group';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
let db = fb.firestore();
const Drawer = createDrawerNavigator();

export function Pg({ navigation }) {
  let name = auth.currentUser.displayName;
  const img =
    'http://freepngclipart.com/download/dog/74598-shiba-inu-doge-dogecoin-free-transparent-image-hd.png';

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <YU />,
      headerBackground: (props) => <Grd />,
      headerTitleAlign: 'center',
      headerLeft: (props) => <Left />,
      headerRight: (props) => <Right />,
      headerStyle: {
        position: 'absolute',
        height: 60
      },
    });
    console.log('USER NAME: ', auth.currentUser.displayName);
  }, [name, navigation]);

  const signOut = React.useCallback(() => {
    auth.signOut().then(() => {
      navigation.replace('Login');
      console.log('Logged out');
    }, [navigation]);
  }, [navigation]);

  function openDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  function YU() {
    const img =
      'http://freepngclipart.com/download/dog/74598-shiba-inu-doge-dogecoin-free-transparent-image-hd.png';
    return (
      <View>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: img,
          }}
        />
      </View>
    );
  }

  function Grd() {
    return (
      <LinearGradient
        colors={['powderblue','#318CE7', 'pink']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}></LinearGradient>
    );
  }

  function Bu() {
    return (
      <View>
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri:
              'https://cdn4.iconfinder.com/data/icons/socialcones/508/Telegram-512.png',
          }}
        />
      </View>
    );
  }

  function Right() {
    return (
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={() => signOut()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'https://cdn3.iconfinder.com/data/icons/user-interface-169/32/logout-512.png',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function Left() {
    return (
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={() => openDrawer()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Group">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="People" component={NewContact} />
      <Drawer.Screen name="Group" component={Group} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 30,
    height: 30,
  },
});

/*{<Drawer.Navigator>
      <Drawer.Screen name="Untitled" component={Untitled} />
    </Drawer.Navigator>}
    
    <View>
      <Text>
        HIii
      </Text>
    </View>
    
    
    
    */
