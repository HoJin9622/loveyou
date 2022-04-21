import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import add from 'date-fns/add';
import RNFS from 'react-native-fs';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {format} from 'date-fns';
import {ActivityIndicator, Platform} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RootStackParamList} from '@navigators/navigator';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
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
export interface IAnniversary {
  type: 'birthday' | 'anniversary';
  date: Date;
  text: string;
}
type Props = NativeStackScreenProps<RootStackParamList, 'Enter'>;

const Enter = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
    register,
    setValue,
    watch,
    getValues,
  } = useForm<EnterFormData>();
  const {setItem} = useAsyncStorage('profile');
  const {setItem: setAnniversary} = useAsyncStorage('anniversary');
  const [birthModalVisible, setBirthModalVisible] = useState(false);
  const [firstDayModalVisible, setFirstDayModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateAnniversaries = useCallback(() => {
    const {birth, firstDay} = getValues();
    const tempAnniversary: IAnniversary[] = [];
    const tempBirthday: IAnniversary[] = [];
    const tempYearAnniversary: IAnniversary[] = [];
    for (let i = 0; i < 15; i++) {
      tempAnniversary.push({
        date: add(new Date(firstDay), {days: i * 100 + 99}),
        type: 'anniversary',
        text: `${i + 1}00-day anniversary`,
      });
    }
    // for (let j = 0; j < 50; j++) {
    //   tempBirthday.push({
    //     date: add(new Date(birth), {years: j + 3}),
    //     type: 'birthday',
    //     text: `${j + 3}th birthday`,
    //   });
    // }
    for (let k = 0; k < 5; k++) {
      tempYearAnniversary.push({
        date: add(new Date(firstDay), {years: k + 3}),
        type: 'anniversary',
        text: `${k + 3}th anniversary`,
      });
    }
    setAnniversary(
      JSON.stringify(
        [
          ...tempAnniversary,
          // ...tempBirthday,
          ...tempYearAnniversary,
          {
            date: add(new Date(firstDay), {days: 49}),
            type: 'anniversary',
            text: '50-day anniversary',
          },
          // {
          //   date: add(new Date(birth), {years: 1}),
          //   type: 'anniversary',
          //   text: '1st birthday',
          // },
          // {
          //   date: add(new Date(birth), {years: 2}),
          //   type: 'anniversary',
          //   text: '2nd birthday',
          // },
          {
            date: add(new Date(firstDay), {years: 1}),
            type: 'anniversary',
            text: '1st anniversary',
          },
          {
            date: add(new Date(firstDay), {years: 2}),
            type: 'anniversary',
            text: '2nd anniversary',
          },
        ].sort((a, b) => +a.date - +b.date),
      ),
    );
  }, [getValues, setAnniversary]);
  const onValid = useCallback(
    async (data: EnterFormData) => {
      setLoading(prev => !prev);
      await setItem(JSON.stringify(data));
      calculateAnniversaries();
      setLoading(prev => !prev);
      navigation.replace('Home');
    },
    [navigation, setItem, calculateAnniversaries],
  );

  const headerRight = useCallback(
    () =>
      loading ? (
        <ActivityIndicator />
      ) : (
        <CompleteButton onPress={handleSubmit(onValid)}>
          <CompleteText active={isValid}>완료</CompleteText>
        </CompleteButton>
      ),
    [handleSubmit, isValid, loading, onValid],
  );
  useLayoutEffect(() => {
    navigation.setOptions({headerRight});
  }, [headerRight, navigation]);
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
