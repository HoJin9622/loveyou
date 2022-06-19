import { RootStackParamsList } from '@navigators/navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Caption1 } from '@components/typography'

type Props = NativeStackScreenProps<RootStackParamsList, 'EditProfile'>

const EditProfile = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Caption1 opacity={0.5}>완료</Caption1>,
    })
  }, [])
  return <></>
}

export default EditProfile
