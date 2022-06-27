import dayjs from 'dayjs'

export const getDifference = (date: dayjs.Dayjs) => {
  return dayjs(new Date()).diff(date, 'd')
}
export const getComingDate = (firstDay: Date): [dayjs.Dayjs, number] => {
  const now = dayjs(new Date())
  const day50 = dayjs(firstDay).add(50, 'd')
  if (day50.isAfter(now)) {
    return [day50, 50]
  }
  let day = 99
  let newDay = dayjs(firstDay).add(day, 'd')
  while (!newDay.isAfter(now)) {
    day += 100
    newDay = dayjs(firstDay).add(day, 'd')
  }
  return [newDay, day + 1]
}
export const getAnniversaries = (firstDay: Date, maxLength: number) => {
  const now = dayjs(new Date())
  let anniversaries = []
  const day50 = dayjs(firstDay).add(50, 'd')
  anniversaries.push({ date: day50, comingUp: day50.isBefore(now) })
  for (let i = 1; i < maxLength; i++) {
    const anniversary = dayjs(firstDay).add(i * 100, 'd')
    const comingUp = dayjs(anniversary).isBefore(now)
    if (comingUp) {
      anniversaries = anniversaries.map((anniversary) => ({
        date: anniversary.date,
        comingUp: false,
      }))
    }
    anniversaries.push({ date: anniversary, comingUp })
  }
  return anniversaries
}
