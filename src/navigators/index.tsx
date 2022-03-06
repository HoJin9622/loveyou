import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Enter from '@screens/Enter';
import {RootStackParamList} from './navigator';

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
    </Stack.Navigator>
  );
};

export default RootStack;
