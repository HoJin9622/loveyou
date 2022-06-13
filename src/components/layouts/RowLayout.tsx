import { FC } from 'react'
import styled from 'styled-components/native'

const SRowLayout = styled.View`
  flex-direction: row;
  align-items: center;
`

const RowLayout: FC = ({ children }) => {
  return <SRowLayout>{children}</SRowLayout>
}

export default RowLayout
