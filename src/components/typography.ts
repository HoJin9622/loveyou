import styled from 'styled-components/native'

interface TypographyProps {
  mr?: number
  ml?: number
  mt?: number
  mb?: number
  color?: string
  lineHeight?: number
  fontWeight?: 400 | 500 | 700
  opacity?: number
}
const getFontFamily = (fontWeight?: number) =>
  fontWeight === 700
    ? 'Pretendard-Bold'
    : fontWeight === 500
    ? 'Pretendard-Medium'
    : 'Pretendard-Regular'
const Typography = styled.Text<TypographyProps>`
  font-family: ${({ fontWeight }) => getFontFamily(fontWeight)};
  margin: ${({ mr = 0, ml = 0, mt = 0, mb = 0 }) =>
    `${mt}px ${mr}px ${mb}px ${ml}px`};
  color: ${({ color, theme }) => (color ? color : theme.colors.black900)};
  opacity: ${({ opacity }) => (opacity ? opacity : 1)};
`
export const Title = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  line-height: ${({ theme }) => theme.lineHeights.title}px;
`
export const SubHeader = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.subHeader}px;
  line-height: ${({ theme }) => theme.lineHeights.subHeader}px;
`
export const Body1 = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.body1}px;
  line-height: ${({ theme }) => theme.lineHeights.body1}px;
`
export const Caption1 = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.caption1}px;
  line-height: ${({ theme }) => theme.lineHeights.caption1}px;
`
export const Caption2 = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.caption2}px;
  line-height: ${({ theme }) => theme.lineHeights.caption2}px;
`
export const Caption3 = styled(Typography)`
  font-size: ${({ theme }) => theme.fontSizes.caption3}px;
  line-height: ${({ theme }) => theme.lineHeights.caption3}px;
`
