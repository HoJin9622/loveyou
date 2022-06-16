import { useRecoilState } from 'recoil'
import { userState } from '@utils/atom'
import styled, { useTheme } from 'styled-components/native'
import { ImageBackground } from 'react-native'
import { Body1, Caption2, Caption3, Title } from '@components/typography'
import Row from '@components/layouts/Row'
import Svg, { Path } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Home = () => {
  const { colors } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const [user] = useRecoilState(userState)
  return !user ? null : (
    <Container>
      <ImageBackground source={{ uri: user.photo }} style={{ flex: 1 }}>
        <UserInfo bottomInset={bottom}>
          <Title color={colors.black0} fontWeight={700} mb={4}>
            {user.name}
          </Title>
          <Body1 color={colors.black0} mb={12}>
            in love{' '}
            <Body1 color={colors.black0} fontWeight={700}>
              185
            </Body1>{' '}
            days
          </Body1>
          <Row>
            <LeftDay>
              <Caption3 fontWeight={700} color={colors.black0}>
                D-25
              </Caption3>
            </LeftDay>
            <Svg width='13' height='12' viewBox='0 0 13 12' fill='none'>
              <Path
                d='M1.8125 10.3125C1.8125 10.5199 1.98008 10.6875 2.1875 10.6875H10.8125C11.0199 10.6875 11.1875 10.5199 11.1875 10.3125V5.39062H1.8125V10.3125ZM10.8125 2.15625H8.84375V1.40625C8.84375 1.35469 8.80156 1.3125 8.75 1.3125H8.09375C8.04219 1.3125 8 1.35469 8 1.40625V2.15625H5V1.40625C5 1.35469 4.95781 1.3125 4.90625 1.3125H4.25C4.19844 1.3125 4.15625 1.35469 4.15625 1.40625V2.15625H2.1875C1.98008 2.15625 1.8125 2.32383 1.8125 2.53125V4.59375H11.1875V2.53125C11.1875 2.32383 11.0199 2.15625 10.8125 2.15625Z'
                fill={colors.black0}
              />
            </Svg>
            <Caption2 fontWeight={700} color={colors.black0} ml={2}>
              2022-03-15
            </Caption2>
            <Caption2 color={colors.black0}> · 200-day anniversary </Caption2>
          </Row>
        </UserInfo>
      </ImageBackground>
    </Container>
  )
}

export default Home

const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.black800};
`
const UserInfo = styled.View<{ bottomInset: number }>`
  width: 100%;
  padding: 24px 20px ${({ bottomInset }) => bottomInset + 24}px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
`
const LeftDay = styled.View`
  padding: 3px 4px;
  background: ${({ theme }) => theme.colors.black900};
  border-radius: 2px;
  margin-right: 8px;
`
