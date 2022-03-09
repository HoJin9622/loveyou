import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Enter from '@screens/Enter';
import {RootStackParamList} from './navigator';
import Home from '@screens/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Enter"
        component={Enter}
        options={{
          title: '',
          headerStyle: {backgroundColor: '#121212'},
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
