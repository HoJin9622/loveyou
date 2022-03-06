import React, {useEffect, useLayoutEffect} from 'react';
import RNFS from 'react-native-fs';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Platform} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RootStackParamList} from '@navigators/navigator';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboard from '@components/DismissKeyboard';
import {RowLayout} from '@components/layout';

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
const CompleteText = styled.Text`
  font-family: 'Pretendard-Regular';
  color: #fff;
  opacity: 0.5;
  font-size: 16px;
  line-height: 19px;
`;
const PhotoBox = styled.TouchableOpacity`
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 14px;
  width: 288px;
  height: 360px;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.Image`
  width: 288px;
  height: 360px;
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

type EnterFormData = {
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

  const headerRight = () => (
    <CompleteButton onPress={handleSubmit(onValid)}>
      <CompleteText>완료</CompleteText>
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

  const choosePhoto = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets && assets[0].uri) {
      const photoUri = await RNFS.readFile(assets[0].uri, 'base64');
      setValue('photoUri', `data:image/jpeg;base64,${photoUri}`);
    }
  };
  const onValid = (data: EnterFormData) => {
    console.log(data);
  };

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
            <FontAwesome5Icon name="calendar" color="#fff" />
            <DateText mr={24}>생일</DateText>
            <FontAwesome5Icon name="calendar" color="#fff" />
            <DateText>사귀기 시작한 날</DateText>
          </RowLayout>
        </Container>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

export default Enter;
