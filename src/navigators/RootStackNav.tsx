import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Intro from '@screens/Intro'
import { useTheme } from 'styled-components'
import { RootStackParamsList } from './navigator'

const Stack = createNativeStackNavigator<RootStackParamsList>()

const RootStackNav = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Intro'
        component={Intro}
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.black800 },
        }}
      />
    </Stack.Navigator>
  )
}

export default RootStackNav
