import React, {useEffect, useLayoutEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {format} from 'date-fns';
import {Platform} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RootStackParamList} from '@navigators/navigator';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateModal from '@components/modal/DateModal';
import DismissKeyboard from '@components/DismissKeyboard';
import {RowLayout, TouchableRow} from '@components/layout';

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background: #121212;
  justify-content: center;
  align-items: center;
  padding: 0 43.5px;
`;
const CompleteButton = styled.TouchableOpacity``;
const CompleteText = styled.Text<{active: boolean}>`
  font-family: ${props =>
    props.active ? 'Pretendard-Bold' : 'Pretendard-Regular'};
  color: #fff;
  opacity: ${props => (props.active ? 1 : 0.5)};
  font-size: 16px;
  line-height: 19px;
`;
const PhotoBox = styled.TouchableOpacity`
  margin-top: -80px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 14px;
  width: 288px;
  height: 400px;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.Image`
  width: 288px;
  height: 400px;
  border-radius: 14px;
`;
const PhotoExplanation = styled.Text`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  line-height: 19px;
  color: #000;
  opacity: 0.5;
  margin-top: 47px;
  text-align: center;
`;
const NicknameInput = styled.TextInput`
  font-family: 'Pretendard-Regular';
  font-size: 32px;
  line-height: 38px;
  color: #fff;
  margin: 32px 0 24px;
  text-align: center;
`;
const DateText = styled.Text<{mr?: number}>`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  margin-left: 8px;
  margin-right: ${props => props.mr || 0}px;
`;
const ChangeWrapper = styled.View`
  position: absolute;
  z-index: 5;
  bottom: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ChangeButton = styled.View`
  padding: 8px 12px 7px;
  background: #ffffff;
  border-radius: 37px;
`;
const ChangeText = styled.Text`
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  line-height: 19px;
  color: #000;
`;

export type EnterFormData = {
  photoUri: string;
  nickname: string;
  birth: string;
  firstDay: string;
};
type Props = NativeStackScreenProps<RootStackParamList, 'Enter'>;

const Enter = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
    register,
    setValue,
    watch,
  } = useForm<EnterFormData>();
  const [birthModalVisible, setBirthModalVisible] = useState(false);
  const [firstDayModalVisible, setFirstDayModalVisible] = useState(false);

  const headerRight = () => (
    <CompleteButton onPress={handleSubmit(onValid)}>
      <CompleteText active={isValid}>완료</CompleteText>
    </CompleteButton>
  );
  useLayoutEffect(() => {
    navigation.setOptions({headerRight});
  }, [headerRight]);
  useEffect(() => {
    register('photoUri', {required: true});
    register('birth', {required: true});
    register('firstDay', {required: true});
  }, [register]);

  const toggleBirthModal = () => setBirthModalVisible(prev => !prev);
  const toggleFirstDayModal = () => setFirstDayModalVisible(prev => !prev);
  const choosePhoto = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets && assets[0].uri) {
      const photoUri = await RNFS.readFile(assets[0].uri, 'base64');
      setValue('photoUri', `data:image/jpeg;base64,${photoUri}`, {
        shouldValidate: true,
      });
    }
  };
  const onValid = (data: EnterFormData) => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <DismissKeyboard>
        <Container>
          <PhotoBox onPress={choosePhoto}>
            {watch('photoUri') ? (
              <>
                <Photo source={{uri: watch('photoUri')}} />
                <ChangeWrapper>
                  <ChangeButton>
                    <ChangeText>변경하기</ChangeText>
                  </ChangeButton>
                </ChangeWrapper>
              </>
            ) : (
              <>
                <EntypoIcon name="plus" color="#2B2B2B" size={44} />
                <PhotoExplanation>
                  여기를 터치해서{'\n'}원하는 사진을 선택해주세요.
                </PhotoExplanation>
              </>
            )}
          </PhotoBox>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value, onChange, onBlur}}) => (
              <NicknameInput
                placeholder="이름 or 애칭"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="nickname"
          />
          <RowLayout>
            <TouchableRow onPress={toggleBirthModal}>
              <FontAwesome5Icon name="calendar" color="#fff" />
              <DateText mr={24}>
                {watch('birth')
                  ? format(new Date(watch('birth')), 'yyyy-MM-dd')
                  : '생일'}
              </DateText>
            </TouchableRow>
            <TouchableRow onPress={toggleFirstDayModal}>
              <FontAwesome5Icon name="calendar" color="#fff" />
              <DateText>
                {watch('firstDay')
                  ? format(new Date(watch('firstDay')), 'yyyy-MM-dd')
                  : '사귀기 시작한 날'}
              </DateText>
            </TouchableRow>
          </RowLayout>
          <DateModal
            toggleDateModal={toggleBirthModal}
            isVisible={birthModalVisible}
            setValue={setValue}
            name="birth"
          />
          <DateModal
            toggleDateModal={toggleFirstDayModal}
            isVisible={firstDayModalVisible}
            setValue={setValue}
            name="firstDay"
          />
        </Container>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

export default Enter;
