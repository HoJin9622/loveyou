import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
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
  width: 100%;
  height: 360px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Enter'>;

const Enter = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CompleteButton>
          <CompleteText>완료</CompleteText>
        </CompleteButton>
      ),
    });
  }, []);
  return (
    <Container>
      <PhotoBox></PhotoBox>
    </Container>
  );
};

export default Enter;
