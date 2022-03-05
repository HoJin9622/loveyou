import React from 'react';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native';
import Hi from '@components/Hi';

const App = () => {
  console.log(Config.SENTRY_DSN);
  return (
    <SafeAreaView>
      <Hi></Hi>
    </SafeAreaView>
  );
};

export default App;
