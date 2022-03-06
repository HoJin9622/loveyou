import React, {FC} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const DismissKeyboard: FC = ({children}) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return <Container onPress={dismissKeyboard}>{children}</Container>;
};

export default DismissKeyboard;
