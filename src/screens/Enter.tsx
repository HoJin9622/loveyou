import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {RootStackParamList} from '@navigators/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Enter'>;

const Enter = ({navigation}: Props) => {
  const headerRight = () => (
    <CompleteButton>
      <CompleteText>완료</CompleteText>
    </CompleteButton>
  );
  useLayoutEffect(() => {
    navigation.setOptions({headerRight});
  }, [headerRight]);
  return (
    <Container>
      <PhotoBox>
        <EntypoIcon name="plus" color="#2B2B2B" size={44} />
      </PhotoBox>
    </Container>
  );
};

export default Enter;
