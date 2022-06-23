import { FC } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

const Row: FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default Row
