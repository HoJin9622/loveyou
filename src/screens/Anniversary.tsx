import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import {FlatList, ListRenderItem} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '@navigators/navigator';
import {BetweenLayout} from '@components/layout';

const Container = styled.View<{topInset: number}>`
  padding: ${props => props.topInset}px 20px 0;
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
const RemnantText = styled.Text<{active: boolean}>`
  font-family: 'Pretendard-Bold';
  font-size: 18px;
  line-height: 22px;
  color: ${props => (props.active ? '#fff' : '#8a8d93')};
`;
const DateText = styled.Text<{active: boolean}>`
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  line-height: 17px;
  color: ${props => (props.active ? '#fff' : '#8a8d93')};
  margin-top: 4px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Anniversary'>;
interface IAnniversary {
  type: 'birthday' | 'anniversary';
  date: string;
  text: string;
}

const Anniversary = ({navigation}: Props) => {
  const today = useMemo(() => new Date(), []);
  const {top} = useSafeAreaInsets();
  const {getItem: getAnniversary} = useAsyncStorage('anniversary');
  const [anniversaries, setAnniversaries] = useState<IAnniversary[]>([]);

  const renderItemFromStorage = async () => {
    const loadedAnniversary = await getAnniversary();
    if (!loadedAnniversary) return;
    const items: IAnniversary[] = JSON.parse(loadedAnniversary);
    setAnniversaries(items);
  };
  useEffect(() => {
    renderItemFromStorage();
  });
  const goBack = () => navigation.goBack();
  const isDayBefore = (date: string) => {
    return getDayDistance(date) > 0;
  };
  const getDayDistance = (date: string) => {
    return differenceInDays(new Date(date), today) + 1;
  };

  const renderItem: ListRenderItem<IAnniversary> | null | undefined = ({
    item: anniversary,
  }) => (
    <AnniversaryBox>
      <BetweenLayout>
        <RemnantText active={isDayBefore(anniversary.date)}>
          {anniversary.text}
        </RemnantText>
        <RemnantText active={isDayBefore(anniversary.date)}>
          D {isDayBefore(anniversary.date) ? '-' : '+'}{' '}
          {Math.abs(getDayDistance(anniversary.date))}
        </RemnantText>
      </BetweenLayout>
      <DateText active={isDayBefore(anniversary.date)}>
        {format(new Date(anniversary.date), 'yyyy-MM-dd')}
      </DateText>
    </AnniversaryBox>
  );
  return (
    <Container topInset={top}>
      <Blur blurType="extraDark" reducedTransparencyFallbackColor="white" />
      <FlatList
        showsVerticalScrollIndicator={false}
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
