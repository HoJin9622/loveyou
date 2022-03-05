import React from 'react';
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';
import {SafeAreaView} from 'react-native';
import Hi from '@components/Hi';

Sentry.init({
  dsn: Config.SENTRY_DSN,
  integrations: [
    new Sentry.ReactNativeTracing({tracingOrigins: ['localhost', /^\//]}),
  ],
});

const App = () => {
  return (
    <SafeAreaView>
      <Hi></Hi>
    </SafeAreaView>
  );
};

export default Sentry.wrap(App);
