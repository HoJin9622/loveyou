import BetweenRow from '@components/layouts/BetweenRow'
import { Body1, Caption1, Caption3 } from '@components/typography'
import { userState } from '@utils/atom'
import { getAnniversaries, getDifference } from '@utils/date'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRecoilState } from 'recoil'
import styled, { useTheme } from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamsList, 'Anniversaries'>

const Anniversaries = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets()
  const { colors } = useTheme()
  const [user] = useRecoilState(userState)
  const [maxLength, setMaxLength] = useState(10)
  const anniversaries = useMemo(
    () => getAnniversaries(user?.firstDay!, user?.birth!, maxLength),
    [user, maxLength]
  )
  const goBack = () => navigation.goBack()
  const renderItem:
    | ListRenderItem<{
        date: dayjs.Dayjs
        comingUp: boolean
        text: string
      }>
    | null
    | undefined = ({ item, index }) => {
    const differenceDate = getDifference(item.date)
    return (
      <Anniversary>
        {item.comingUp && (
          <ComingUp>
            <Caption3 fontWeight={700} color={colors.black0}>
              COMING UP
            </Caption3>
          </ComingUp>
        )}
        <BetweenRow>
          <Body1 fontWeight={700} color={colors.black0}>
            {item.text}
          </Body1>
          <Body1 color={colors.black0} fontWeight={700}>
            D
            {differenceDate === 0
              ? 'today 💕'
              : differenceDate > 0
              ? `+${differenceDate}`
              : differenceDate}
          </Body1>
        </BetweenRow>
        <Caption1 fontWeight={500} color={colors.black0} mt={4}>
          {item.date.format('YYYY-MM-DD')}
        </Caption1>
      </Anniversary>
    )
  }
  return (
    <>
      <FlatList
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingTop: top }}
        data={anniversaries}
        renderItem={renderItem}
        keyExtractor={(_, index) => index + ''}
        onEndReached={() => setMaxLength((prev) => prev + 10)}
      />
      <Close topInset={top} onPress={goBack}>
        <AntDesign name='close' size={28} color={colors.black0} />
      </Close>
    </>
  )
}

export default Anniversaries

const Anniversary = styled.View`
  padding: 24px 0;
`
const ComingUp = styled.View`
  padding: 3px 4px;
  background: ${({ theme }) => theme.colors.red500};
  border-radius: 2.17218px;
  align-self: flex-start;
  margin-bottom: 8px;
`
const Close = styled.Pressable<{ topInset: number }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: ${({ topInset }) => topInset + 16}px;
  right: 20px;
  justify-content: center;
  align-items: center;
`
