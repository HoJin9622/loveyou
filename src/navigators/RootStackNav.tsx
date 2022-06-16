import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@screens/Home'
import Intro from '@screens/Intro'
import { userState } from '@utils/atom'
import { useRecoilState } from 'recoil'
import { useTheme } from 'styled-components'
import { RootStackParamsList } from './navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { useState } from 'react'

const Stack = createNativeStackNavigator<RootStackParamsList>()

const RootStackNav = () => {
  const { colors } = useTheme()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      let user = jsonValue != null ? JSON.parse(jsonValue) : null
      user.birth = new Date(user.birth)
      user.firstDay = new Date(user.firstDay)
      setUser(user)
    } catch (e) {
      console.log('getUser err ', e)
    } finally {
      setLoading(false)
    }
  }
  return loading && !user ? null : (
    <Stack.Navigator initialRouteName={user ? 'Home' : 'Intro'}>
      <Stack.Screen
        name='Intro'
        component={Intro}
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.black800 },
        }}
      />
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootStackNav
