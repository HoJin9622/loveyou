import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Intro from '../screens/Intro'

const Stack = createNativeStackNavigator()

const RootStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Intro'
        component={Intro}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootStackNav
