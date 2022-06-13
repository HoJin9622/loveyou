import DismissKeyboard from '@components/DismissKeyboard'
import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect } from 'react'
import { Keyboard, Text } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'

const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.black800};
  padding: 0 43.5px;
  justify-content: center;
  align-items: center;
`
const PhotoBox = styled.Pressable`
  width: 100%;
  height: 60%;
  background: ${({ theme }) => theme.colors.black0};
  border-radius: 14px;
  margin-bottom: 32px;
  justify-content: center;
  align-items: center;
`
const Input = styled.TextInput`
  font-size: 32px;
  line-height: 38px;
  color: ${({ theme }) => theme.colors.black0};
`
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`

type Props = NativeStackScreenProps<RootStackParamsList, 'Intro'>

const Intro = ({ navigation }: Props) => {
  const { colors } = useTheme()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text style={{ color: '#fff' }}>완료</Text>,
    })
  }, [navigation])
  const onPhotoBoxClick = () => {
    Keyboard.dismiss()
  }
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={90}>
        <Container>
          <StatusBar style='light' />
          <PhotoBox onPress={onPhotoBoxClick}>
            <Entypo name='plus' size={44} color={colors.black900} />
            <Text
              style={{
                color: colors.black500,
                fontSize: 16,
                lineHeight: 19,
                marginTop: 47,
              }}
            >
              여기를 터치해서
            </Text>
            <Text
              style={{ color: colors.black500, fontSize: 16, lineHeight: 19 }}
            >
              원하는 사진을 선택해주세요.
            </Text>
          </PhotoBox>
          <Input
            placeholder='이름 or 애칭'
            placeholderTextColor={colors.black0}
          />
        </Container>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}

export default Intro
