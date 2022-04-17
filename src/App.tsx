import React, {useEffect} from 'react';
import Config from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigators';

Sentry.init({
  dsn: Config.SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
