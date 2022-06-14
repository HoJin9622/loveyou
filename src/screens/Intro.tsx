import DismissKeyboard from '@components/layouts/DismissKeyboard'
import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useLayoutEffect } from 'react'
import { Keyboard, Platform, Text } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Entypo, Feather } from '@expo/vector-icons'
import RowLayout from '@components/layouts/RowLayout'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import { Controller, useForm } from 'react-hook-form'
import { Caption1 } from '@components/typhography'

interface UserForm {
  photo: string
  name: string
  birth: string
  firstDay: string
}

type Props = NativeStackScreenProps<RootStackParamsList, 'Intro'>

const Intro = ({ navigation }: Props) => {
  const { colors } = useTheme()
  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserForm>({ mode: 'onChange' })

  useEffect(() => {
    register('photo', { required: true })
  }, [register])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Caption1
          color={colors.black0}
          opacity={isValid ? 1 : 0.5}
          fontWeight={isValid ? 700 : 400}
        >
          완료
        </Caption1>
      ),
    })
  }, [navigation, isValid])

  const onPhotoBoxClick = async () => {
    Keyboard.dismiss()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    })
    if (!result.cancelled && result.base64) {
      setValue('photo', `data:image/jpeg;base64,${result.base64}`, {
        shouldValidate: true,
      })
    }
  }

  // const [date, setDate] = useState(new Date(1598051730000))

  // const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
  //   const currentDate = selectedDate
  //   setDate(currentDate)
  // }

  // const showMode = (currentMode: string) => {
  //   DateTimePickerAndroid.open({
  //     value: date,
  //     onChange,
  //     mode: currentMode,
  //     is24Hour: true,
  //   })
  // }

  // const showDatepicker = () => {
  //   showMode('date')
  // }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <Container>
          <StatusBar style='light' />
          <PhotoBox onPress={onPhotoBoxClick}>
            {watch('photo') ? (
              <Photo source={{ uri: watch('photo') }} />
            ) : (
              <>
                <Entypo name='plus' size={44} color={colors.black900} />
                <Caption1 opacity={0.5} mt={48}>
                  여기를 터치해서
                </Caption1>
                <Caption1 opacity={0.5}>원하는 사진을 선택해주세요.</Caption1>
              </>
            )}
          </PhotoBox>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='이름 or 애칭'
                placeholderTextColor={colors.black0}
                value={value}
                onChangeText={onChange}
              />
            )}
            name='name'
          />
          <RowLayout>
            <Feather
              name='calendar'
              size={24}
              color={colors.black0}
              style={{ marginRight: 8 }}
            />
            <Caption1 color={colors.black0}>생일</Caption1>
            <Feather
              name='calendar'
              size={24}
              color={colors.black0}
              style={{ marginRight: 8, marginLeft: 24 }}
            />
            <Caption1 color={colors.black0}>사귀기 시작한 날</Caption1>
          </RowLayout>
          {/* {true && (
            <DateTimePicker
              style={{ width: '100%' }}
              testID='dateTimePicker'
              value={date}
              mode='date'
              onChange={onChange}
              display='spinner'
            />
          )} */}
        </Container>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  )
}

export default Intro

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
const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 14px;
`
const Input = styled.TextInput`
  font-size: 32px;
  line-height: 38px;
  color: ${({ theme }) => theme.colors.black0};
  margin-bottom: 24px;
  text-align: center;
`
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`
