import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
import { RootStackParamList } from './_types';
import { fadeTransition } from './transitions';
import { LogBox } from 'react-native';

//Unauthenticated Stack
// import Login from '../screens/Authentication/Login';
// import Login from '../screens/Authentication/Login';

//Authenticated Stack
import Home from '../screens/Home';
//Bottom Tabs
import BottomTabs from './BottomTabs';

import Template from '../screens/Template';
import ProfileScreen from '../screens/Profiles';
import Information from '../screens/Information';
import MoviewDetailsScreen from '../screens/MovieDetailsScreen';
import StreamingFilm from '../screens/movies/streamingFilm';
import SplashScreen from 'react-native-splash-screen';
import Favorit from '../screens/Favorit';
import Riwayat from '../screens/Riwayat';
import Pencarian from '../screens/Pencarian';



LogBox.ignoreLogs([
  'Possible Unhandled Promise Rejection',
  'virtualizedLists should never be nested',
  'Warning: This synthetic event is reused for performance reasons.',
]);

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabs'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Information"
        component={Information}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Favorit"
        component={Favorit}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Pencarian"
        component={Pencarian}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="MoviewDetailsScreen"
        component={MoviewDetailsScreen}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="StreamingFilm"
        component={StreamingFilm}
        options={{
          ...fadeTransition,
        }}
      />

      <Stack.Screen
        name="Template"
        component={Template}
        options={{
          ...fadeTransition,
        }}
      />
    </Stack.Navigator>
  );
};


const RootNavigator = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1);
  }, []);
  return <AuthenticatedStack />;
};


export default RootNavigator;


