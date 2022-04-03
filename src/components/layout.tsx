import styled from 'styled-components/native';

export const RowLayout = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TouchableRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const BetweenLayout = styled(RowLayout)`
  justify-content: space-between;
`;
