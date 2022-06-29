import { FC } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const BetweenRow: FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default BetweenRow
