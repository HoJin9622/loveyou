import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import add from 'date-fns/add';
import format from 'date-fns/format';
import {FlatList, ListRenderItem} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '@navigators/navigator';
import {BetweenLayout} from '@components/layout';
import {EnterFormData} from './Enter';

const Container = styled.View`
  padding: 0 20px;
  flex: 1;
`;
const CloseButton = styled.TouchableOpacity<{topInset: number}>`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 28px;
  width: 56px;
  height: 56px;
  position: absolute;
  top: ${props => props.topInset + 16}px;
  right: 20px;
  justify-content: center;
  align-items: center;
`;
const Blur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const AnniversaryBox = styled.View`
  margin-bottom: 24px;
`;
const RemnantText = styled.Text`
  font-family: 'Pretendard-Bold';
  font-size: 18px;
  line-height: 22px;
  color: #fff;
`;
const DateText = styled.Text`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  margin-top: 4px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Anniversary'>;
interface IAnniversary {
  type: 'birthday' | 'anniversary';
  date: Date;
}

const Anniversary = ({navigation}: Props) => {
  const today = useMemo(() => new Date(), []);
  const {top} = useSafeAreaInsets();
  const [profile, setProfile] = useState<EnterFormData | null>(null);
  const [anniversaries, setAnniversaries] = useState<IAnniversary[]>([]);
  const {getItem} = useAsyncStorage('profile');

  const getAnniversary = useCallback(() => {
    if (!profile) return;
    const thisYear = today.getFullYear();
    const birthday = new Date(new Date(profile.birth));
    const birthdayMonth = birthday.getMonth() + 1;
    const birthDayDay = birthday.getDate();
    const thisBirthday = new Date(
      `${thisYear}-${birthdayMonth}-${birthDayDay}`,
    );
    const onCommingBirthday = add(thisBirthday, {years: 1});
    setAnniversaries([
      ...anniversaries,
      {type: 'birthday', date: onCommingBirthday},
    ]);
  }, [anniversaries, profile, today]);
  const renderItemFromStorage = useCallback(async () => {
    const item = await getItem();
    if (!item) return;
    const loadedProfile: EnterFormData = JSON.parse(item);
    setProfile(loadedProfile);
    getAnniversary();
  }, [getAnniversary, getItem]);
  useEffect(() => {
    renderItemFromStorage();
  }, [renderItemFromStorage]);
  const goBack = () => navigation.goBack();

  const renderItem: ListRenderItem<IAnniversary> | null | undefined = ({
    item: anniversary,
  }) => (
    <AnniversaryBox>
      <BetweenLayout>
        <RemnantText>
          {anniversary.type === 'birthday'
            ? '26th birthday'
            : '300-day anniversary'}
        </RemnantText>
        <RemnantText>D - 25</RemnantText>
      </BetweenLayout>
      <DateText>{format(anniversary.date, 'yyyy-MM-dd')}</DateText>
    </AnniversaryBox>
  );
  return (
    <Container>
      <Blur blurType="extraDark" reducedTransparencyFallbackColor="white" />
      <FlatList
        data={anniversaries}
        renderItem={renderItem}
        keyExtractor={(_, index) => index + ''}
        inverted
      />
      <CloseButton onPress={goBack} topInset={top}>
        <AntIcon name="close" color="#fff" size={32} />
      </CloseButton>
    </Container>
  );
};

export default Anniversary;
