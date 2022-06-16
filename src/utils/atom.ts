import { atom } from 'recoil'

export interface UserForm {
  photo: string
  name: string
  birth: Date
  firstDay: Date
}

export const userState = atom<UserForm | null>({
  key: 'userState',
  default: null,
})
