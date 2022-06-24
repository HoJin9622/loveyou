import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNav from '@navigators/RootStackNav'
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'
import * as Font from 'expo-font'
import { RecoilRoot } from 'recoil'
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'https://fc772f93a2934ea382e867927dcc5c9e@o1149093.ingest.sentry.io/6220861',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
          'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
          'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <RootStackNav />
        </NavigationContainer>
      </ThemeProvider>
    </RecoilRoot>
  )
}
