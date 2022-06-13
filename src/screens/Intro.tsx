import DismissKeyboard from '@components/layouts/DismissKeyboard'
import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect, useState } from 'react'
import { Keyboard, Text } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Entypo, Feather } from '@expo/vector-icons'
import RowLayout from '@components/layouts/RowLayout'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

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
  margin-bottom: 24px;
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

  const [date, setDate] = useState(new Date(1598051730000))

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showMode = (currentMode: string) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    })
  }

  const showDatepicker = () => {
    showMode('date')
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
          <RowLayout>
            <Feather
              name='calendar'
              size={24}
              color={colors.black0}
              style={{ marginRight: 8 }}
            />
            <Text
              onPress={showDatepicker}
              style={{ color: colors.black0, fontSize: 16, lineHeight: 19 }}
            >
              생일
            </Text>
            <Feather
              name='calendar'
              size={24}
              color={colors.black0}
              style={{ marginRight: 8, marginLeft: 24 }}
            />
            <Text
              style={{ color: colors.black0, fontSize: 16, lineHeight: 19 }}
            >
              사귀기 시작한 날
            </Text>
          </RowLayout>
          {true && (
            <DateTimePicker
              style={{ width: '100%' }}
              testID='dateTimePicker'
              value={date}
              mode='date'
              onChange={onChange}
              display='spinner'
            />
          )}
        </Container>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}

export default Intro
