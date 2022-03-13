import React from 'react';
import styled from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigators/navigator';

const Container = styled.View`
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

type Props = NativeStackScreenProps<RootStackParamList, 'Anniversary'>;

const Anniversary = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const goBack = () => navigation.goBack();
  return (
    <Container>
      <Blur blurType="extraDark" reducedTransparencyFallbackColor="white" />
      <CloseButton onPress={goBack} topInset={top}>
        <AntIcon name="close" color="#fff" size={32} />
      </CloseButton>
    </Container>
  );
};

export default Anniversary;
