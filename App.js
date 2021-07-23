import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Pg } from './components/Pg';
import { ChatScreen } from './components/ChatScreen';
import { NewContact } from './components/NewContact';
import { GroupChat } from './components/GroupChat';
import { Group } from './components/Group';
import { AddGroup } from './components/addGroup';
import { GroupInfo } from './components/GroupInfo';
import LinearGradient from 'react-native-web-linear-gradient';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1da1f2',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerLeft: null,
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerTintColor: '#585858',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTintColor: '#585858',
            headerTitleAlign: 'center',
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="Untitled" component={Home} />
        <Stack.Screen name="Pg" component={Pg} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="NewContact" component={NewContact} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
        <Stack.Screen name="GroupInfo" component={GroupInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*{<Stack.Screen name="Pg" component={Pg} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Exp" component={Exp} options={{ headerTitleAlign: 'center'}}/>}
import { Pg } from './components/Pg';
import {Exp} from './components/Exp';
import { AddContact } from './components/AddContact';
import {Chat} from './components/Chat';
        */

export default MyStack;
