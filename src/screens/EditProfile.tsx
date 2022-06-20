import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Caption1, SubHeader } from '@components/typography'
import styled, { useTheme } from 'styled-components/native'
import { useRecoilState } from 'recoil'
import { UserForm, userState } from '@utils/atom'
import { Controller, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import Svg, { Path } from 'react-native-svg'
import { Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = NativeStackScreenProps<RootStackParamsList, 'EditProfile'>

const EditProfile = ({ navigation }: Props) => {
  const { colors } = useTheme()
  const [user, setUser] = useRecoilState(userState)
  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserForm>({
    mode: 'onChange',
    defaultValues: user || undefined,
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Caption1 onPress={handleSubmit(onValid)} opacity={isValid ? 1 : 0.5}>
          완료
        </Caption1>
      ),
    })
  }, [isValid])
  useEffect(() => {
    register('photo', { required: true })
    register('birth', { required: true })
    register('firstDay', { required: true })
  }, [register])

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
  const onValid = async (form: UserForm) => {
    try {
      setUser(form)
      await AsyncStorage.setItem('user', JSON.stringify(form))
      navigation.goBack()
    } catch (e) {
      console.log('onValid err ', e)
    }
  }

  return !user ? null : (
    <Container>
      <PhotoBox onPress={onPhotoBoxClick}>
        <Photo source={{ uri: watch('photo') }} />
      </PhotoBox>
      <Caption1 color={colors.black300}>이름 or 애칭</Caption1>
      <InputBox disabled>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='이름 or 애칭'
              placeholderTextColor={colors.black500}
              value={value}
              onChangeText={onChange}
            />
          )}
          name='name'
        />
      </InputBox>
      <Caption1 color={colors.black300}>생일</Caption1>
      <InputBox>
        <Svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <Path
            d='M1.33334 12.6666C1.33334 13.8 2.20001 14.6666 3.33334 14.6666H12.6667C13.8 14.6666 14.6667 13.8 14.6667 12.6666V7.33331H1.33334V12.6666ZM12.6667 2.66665H11.3333V1.99998C11.3333 1.59998 11.0667 1.33331 10.6667 1.33331C10.2667 1.33331 10 1.59998 10 1.99998V2.66665H6.00001V1.99998C6.00001 1.59998 5.73334 1.33331 5.33334 1.33331C4.93334 1.33331 4.66668 1.59998 4.66668 1.99998V2.66665H3.33334C2.20001 2.66665 1.33334 3.53331 1.33334 4.66665V5.99998H14.6667V4.66665C14.6667 3.53331 13.8 2.66665 12.6667 2.66665Z'
            fill={colors.black900}
          />
        </Svg>
        <SubHeader ml={8}>
          {dayjs(watch('birth')).format('YYYY-MM-DD')}
        </SubHeader>
      </InputBox>
      <Caption1 color={colors.black300}>사귀기 시작한 날</Caption1>
      <InputBox>
        <Svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
          <Path
            d='M1.33334 12.6666C1.33334 13.8 2.20001 14.6666 3.33334 14.6666H12.6667C13.8 14.6666 14.6667 13.8 14.6667 12.6666V7.33331H1.33334V12.6666ZM12.6667 2.66665H11.3333V1.99998C11.3333 1.59998 11.0667 1.33331 10.6667 1.33331C10.2667 1.33331 10 1.59998 10 1.99998V2.66665H6.00001V1.99998C6.00001 1.59998 5.73334 1.33331 5.33334 1.33331C4.93334 1.33331 4.66668 1.59998 4.66668 1.99998V2.66665H3.33334C2.20001 2.66665 1.33334 3.53331 1.33334 4.66665V5.99998H14.6667V4.66665C14.6667 3.53331 13.8 2.66665 12.6667 2.66665Z'
            fill={colors.black900}
          />
        </Svg>
        <SubHeader ml={8}>
          {dayjs(watch('firstDay')).format('YYYY-MM-DD')}
        </SubHeader>
      </InputBox>
    </Container>
  )
}

export default EditProfile

const Container = styled.ScrollView`
  background: ${({ theme }) => theme.colors.black0};
  padding: 0 20px;
`
const PhotoBox = styled.Pressable`
  width: 180px;
  height: 240px;
  border-radius: 14px;
  margin: 24px auto;
`
const Photo = styled.Image`
  width: 180px;
  height: 240px;
  border-radius: 14px;
`
const InputBox = styled.Pressable`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.black200};
  padding: 0 16px;
  margin: 8px 0 16px;
  flex-direction: row;
  align-items: center;
`
const Input = styled.TextInput`
  height: 100%;
  color: ${({ theme }) => theme.colors.black900};
  font-size: ${({ theme }) => theme.fontSizes.subHeader}px;
`
