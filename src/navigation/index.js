import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import colors from '../../assets/colors'
import LiveNow from '../container/liveNow';
import Ended from '../container/ended';
import Splash from  '../container/splash';
import PollDetails from '../container/pollDetails';
import Comments from '../container/pollDetails/commendsScreen';
import Profile from '../container/profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MainBottomNav( ) {

return (
  <Tab.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: "#fff",
        paddingBottom: 5,
        height: 60,



      },
      activeTintColor: colors.black,
      showLabel: false,
      inactiveTintColor:"gray"

    }}
  >
    <Tab.Screen

      options={{
        tabBarLabel: 'LiveNow',
        tabBarIcon: ({ color, size }) => (
          <Icon name="timeline" color={color} size={color != colors.black ? size : 40} />
        ),
      }}

      name="LiveNow" component={LiveNow} />
    <Tab.Screen
      options={{
        tabBarLabel: 'Ended',
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" color={color} size={color != colors.black ? size : 40} />
        ),
      }}
      name="Ended" component={Ended} />
       <Tab.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={color != colors.black ? size : 40} />
        ),
      }}
      name="Profile" component={Profile} />
 
    

  </Tab.Navigator>
);
}

export default function App() {
  return (      
    <NavigationContainer>
    <Stack.Navigator  
    >
      <Stack.Screen
      options={{
            headerShown: false
          }}
       name="Splash" component={Splash} />
      <Stack.Screen
      options={{
            headerShown: false
          }}
       name="MainBottomNav" component={MainBottomNav} />
       <Stack.Screen
      options={{
            headerShown: false
          }}
       name="PollDetails" component={PollDetails} />
        <Stack.Screen
      options={{
            headerShown: false
          }}
       name="Comments" component={Comments} />
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}