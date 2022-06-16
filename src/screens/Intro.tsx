import DismissKeyboard from '@components/layouts/DismissKeyboard'
import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'
import Row from '@components/layouts/Row'
import * as ImagePicker from 'expo-image-picker'
import { Controller, useForm } from 'react-hook-form'
import { Caption1 } from '@components/typography'
import Svg, { Path } from 'react-native-svg'
import Modal from 'react-native-modal'
import TouchableRow from '@components/layouts/TouchableRow'
import DateTimePicker, {
  DateTimePickerEvent,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserForm } from '@utils/atom'

type Props = NativeStackScreenProps<RootStackParamsList, 'Intro'>

const DEFAULT_BIRTH = new Date('1997-01-01')
const NOW = new Date()

const Intro = ({ navigation }: Props) => {
  const { colors } = useTheme()
  const [birthModalVisible, setBirthModalVisible] = useState(false)
  const [firstDayModalVisible, setFirstDayModalVisible] = useState(false)
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
    register('birth', { required: true })
    register('firstDay', { required: true })
  }, [register])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Caption1
          color={colors.black0}
          opacity={isValid ? 1 : 0.5}
          fontWeight={isValid ? 700 : 400}
          onPress={handleSubmit(onValid)}
        >
          완료
        </Caption1>
      ),
    })
  }, [navigation, isValid])

  const onValid = async (form: UserForm) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(form))
      navigation.replace('Home')
    } catch (e) {
      console.log('onValid err ', e)
    }
  }
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
  const toggleBirthModal = () => setBirthModalVisible((prev) => !prev)
  const toggleFirstDayModal = () => setFirstDayModalVisible((prev) => !prev)
  const onBirthPress = () => {
    setValue('birth', DEFAULT_BIRTH)
    if (Platform.OS === 'ios') {
      toggleBirthModal()
    }
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: watch('birth') || DEFAULT_BIRTH,
        onChange: onBirthChange,
      })
    }
  }
  const onFirstDayPress = () => {
    setValue('firstDay', NOW)
    if (Platform.OS === 'ios') {
      toggleFirstDayModal()
    }
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: watch('firstDay') || NOW,
        onChange: onFirstDayChange,
      })
    }
  }
  const onBirthChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setValue('birth', selectedDate, { shouldValidate: true })
    }
  }
  const onFirstDayChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setValue('firstDay', selectedDate, { shouldValidate: true })
    }
  }

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
          <Row>
            <TouchableRow onPress={onBirthPress}>
              <Svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <Path
                  d='M1.33334 12.6666C1.33334 13.8 2.20001 14.6666 3.33334 14.6666H12.6667C13.8 14.6666 14.6667 13.8 14.6667 12.6666V7.33331H1.33334V12.6666ZM12.6667 2.66665H11.3333V1.99998C11.3333 1.59998 11.0667 1.33331 10.6667 1.33331C10.2667 1.33331 10 1.59998 10 1.99998V2.66665H6.00001V1.99998C6.00001 1.59998 5.73334 1.33331 5.33334 1.33331C4.93334 1.33331 4.66668 1.59998 4.66668 1.99998V2.66665H3.33334C2.20001 2.66665 1.33334 3.53331 1.33334 4.66665V5.99998H14.6667V4.66665C14.6667 3.53331 13.8 2.66665 12.6667 2.66665Z'
                  fill={colors.black0}
                />
              </Svg>
              <Caption1 color={colors.black0} ml={8} mr={24}>
                {watch('birth')
                  ? dayjs(watch('birth')).format('YYYY-MM-DD')
                  : '생일'}
              </Caption1>
            </TouchableRow>
            <TouchableRow onPress={onFirstDayPress}>
              <Svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <Path
                  d='M1.33334 12.6666C1.33334 13.8 2.20001 14.6666 3.33334 14.6666H12.6667C13.8 14.6666 14.6667 13.8 14.6667 12.6666V7.33331H1.33334V12.6666ZM12.6667 2.66665H11.3333V1.99998C11.3333 1.59998 11.0667 1.33331 10.6667 1.33331C10.2667 1.33331 10 1.59998 10 1.99998V2.66665H6.00001V1.99998C6.00001 1.59998 5.73334 1.33331 5.33334 1.33331C4.93334 1.33331 4.66668 1.59998 4.66668 1.99998V2.66665H3.33334C2.20001 2.66665 1.33334 3.53331 1.33334 4.66665V5.99998H14.6667V4.66665C14.6667 3.53331 13.8 2.66665 12.6667 2.66665Z'
                  fill={colors.black0}
                />
              </Svg>
              <Caption1 color={colors.black0} ml={8}>
                {watch('firstDay')
                  ? dayjs(watch('firstDay')).format('YYYY-MM-DD')
                  : '사귀기 시작한 날'}
              </Caption1>
            </TouchableRow>
          </Row>
          <ModalContainer
            isVisible={birthModalVisible && Platform.OS === 'ios'}
            onBackButtonPress={toggleBirthModal}
            onBackdropPress={toggleBirthModal}
          >
            <ModalBox>
              <DateTimePicker
                testID='birth'
                value={watch('birth') || DEFAULT_BIRTH}
                mode='date'
                onChange={onBirthChange}
                display='spinner'
                textColor={colors.black900}
              />
            </ModalBox>
          </ModalContainer>
          <ModalContainer
            isVisible={firstDayModalVisible && Platform.OS === 'ios'}
            onBackButtonPress={toggleFirstDayModal}
            onBackdropPress={toggleFirstDayModal}
          >
            <ModalBox>
              <DateTimePicker
                testID='firstDay'
                value={watch('firstDay') || NOW}
                mode='date'
                onChange={onFirstDayChange}
                display='spinner'
                textColor={colors.black900}
              />
            </ModalBox>
          </ModalContainer>
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
const ModalContainer = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`
const ModalBox = styled.View`
  width: 100%;
  padding: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: ${({ theme }) => theme.colors.black0};
`
