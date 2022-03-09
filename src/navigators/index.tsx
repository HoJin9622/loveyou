import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Enter from '@screens/Enter';
import Home from '@screens/Home';
import {RootStackParamList} from './navigator';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [loading, setLoading] = useState(false);
  const [dataExist, setDataExist] = useState(false);
  const {getItem} = useAsyncStorage('profile');
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setLoading(prev => !prev);
    const profile = await getItem();
    if (profile) {
      setDataExist(true);
    }
    setLoading(prev => !prev);
  };
  return loading ? (
    <ActivityIndicator />
  ) : (
    <Stack.Navigator initialRouteName={dataExist ? 'Home' : 'Enter'}>
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
