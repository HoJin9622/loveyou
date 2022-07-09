import dayjs from 'dayjs'

const now = dayjs(new Date())

const numberPrefix = (i: number) => (i === 1 ? 'st' : i === 2 ? 'nd' : 'th')
export const getDifference = (date: dayjs.Dayjs) => {
  return now.isAfter(date)
    ? now.diff(date.add(-1, 'd'), 'd')
    : now.diff(date.add(2, 'd'), 'd')
}
export const getComingDate = (firstDay: Date): [dayjs.Dayjs, number] => {
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
export const getAnniversaries = (
  firstDay: Date,
  birth: Date,
  maxLength: number
) => {
  let anniversaries = []
  const firstDayByDayjs = dayjs(firstDay)
  const day50 = firstDayByDayjs.add(49, 'd')
  anniversaries.push({
    date: day50,
    comingUp: false,
    text: '50-day anniversary',
  })
  for (let i = 1; i < maxLength; i++) {
    const anniversary = firstDayByDayjs.add(i * 100, 'd').add(-1, 'd')
    anniversaries.push({
      date: anniversary,
      comingUp: false,
      text: `${i * 100}-day anniversary`,
    })
  }
  const year = Math.floor(
    anniversaries[anniversaries.length - 1].date
      .add(1, 'd')
      .diff(firstDayByDayjs, 'd') / 365
  )
  const birthYear = firstDayByDayjs.diff(dayjs(birth), 'y')
  for (let i = 1; i <= year; i++) {
    const anniversary = firstDayByDayjs.add(i, 'y')
    const birthday = dayjs(birth).add(birthYear + i, 'y')
    anniversaries.push({
      date: anniversary,
      comingUp: false,
      text: `${i}${numberPrefix(i)} anniversary`,
    })
    anniversaries.push({
      date: birthday,
      comingUp: false,
      text: `${birthYear + i + 1}${numberPrefix(birthYear + i)} birthday`,
    })
  }
  const index = anniversaries.findIndex((anniversary) =>
    anniversary.date.isAfter(now)
  )
  anniversaries[index].comingUp = true
  return anniversaries.sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1))
}
