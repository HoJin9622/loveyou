import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNav from '@navigators/RootStackNav'
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise((resolve) => setTimeout(resolve, 2000))
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
    <ThemeProvider theme={theme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <RootStackNav />
      </NavigationContainer>
    </ThemeProvider>
  )
}
