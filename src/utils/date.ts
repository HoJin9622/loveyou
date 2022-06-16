import dayjs from 'dayjs'

export const getDifference = (date1: Date, date2: Date) => {
  return dayjs(date1).diff(dayjs(date2), 'd') + 1
}
