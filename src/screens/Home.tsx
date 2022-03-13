import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import differenceInDays from 'date-fns/differenceInDays';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {EnterFormData} from './Enter';
import {RowLayout} from '@components/layout';
import {RootStackParamList} from '@navigators/navigator';

const Background = styled.ImageBackground`
  flex: 1;
`;
const Card = styled.TouchableOpacity<{bottomInset: number}>`
  width: 100%;
  padding: 24px 20px ${props => props.bottomInset + 24}px;
  position: absolute;
  bottom: 0;
  background-color: transparent;
`;
const Name = styled.Text`
  font-family: 'Pretendard-Bold';
  font-size: 32px;
  line-height: 38px;
  color: #fff;
`;
const TotalDayText = styled.Text`
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  margin: 4px 0 12px;
`;
const TotalDayAccentText = styled(TotalDayText)`
  font-family: 'Pretendard-Bold';
  margin: 0;
`;
const AnniversaryCountBox = styled.View`
  padding: 3px 4px;
  background: #000000;
  border-radius: 2.17218px;
  margin-right: 4px;
`;
const AnniversaryCountText = styled.Text`
  font-family: 'Pretendard-Bold';
  font-size: 10px;
  line-height: 12px;
  color: #fff;
`;
const AnniversaryDateText = styled.Text`
  font-family: 'Pretendard-Bold';
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  margin-left: 2px;
`;
const AnniversaryNameText = styled.Text`
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  line-height: 14px;
  color: #fff;
`;
const Blur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const now = new Date();
  const {bottom} = useSafeAreaInsets();
  const [profile, setProfile] = useState<EnterFormData | null>(null);
  const {getItem} = useAsyncStorage('profile');

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (!item) return;
    const profile: EnterFormData = JSON.parse(item);
    setProfile(profile);
  };
  const goToAnniversary = () => navigation.navigate('Anniversary');
  return !profile ? null : (
    <Background source={{uri: profile?.photoUri}}>
      <Card bottomInset={bottom} onPress={goToAnniversary}>
        <Blur blurType="extraDark" reducedTransparencyFallbackColor="white" />
        <Name>{profile?.nickname}</Name>
        <TotalDayText>
          in love{' '}
          <TotalDayAccentText>
            {differenceInDays(now, new Date(profile.firstDay)) + 1}
          </TotalDayAccentText>{' '}
          days
        </TotalDayText>
        <RowLayout>
          <AnniversaryCountBox>
            <AnniversaryCountText>D-25</AnniversaryCountText>
          </AnniversaryCountBox>
          <FontAwesome5Icon name="calendar" color="#fff" />
          <AnniversaryDateText>2022-03-15 </AnniversaryDateText>
          <AnniversaryNameText>· 200-day anniversary </AnniversaryNameText>
        </RowLayout>
      </Card>
    </Background>
  );
};

export default Home;
