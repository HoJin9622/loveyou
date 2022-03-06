import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Enter from '@screens/Enter';
import {RootStackParamList} from './navigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Enter" component={Enter} />
    </Stack.Navigator>
  );
};

export default RootStack;
