import dayjs from 'dayjs'

export const getDifference = (date: dayjs.Dayjs) => {
  const now = dayjs(new Date())
  return now.isAfter(date)
    ? now.diff(date.add(-1, 'd'), 'd')
    : now.diff(date.add(2, 'd'), 'd')
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
  let anniversaries = []
  const now = dayjs(new Date())
  const day50 = dayjs(firstDay).add(49, 'd')
  anniversaries.push({
    date: day50,
    comingUp: false,
    text: '50-day anniversary',
  })
  for (let i = 1; i < maxLength; i++) {
    const anniversary = dayjs(firstDay)
      .add(i * 100, 'd')
      .add(-1, 'd')
    anniversaries.push({
      date: anniversary,
      comingUp: false,
      text: `${i * 100}-day anniversary`,
    })
  }
  const year = Math.floor(
    anniversaries[anniversaries.length - 1].date
      .add(1, 'd')
      .diff(dayjs(firstDay), 'd') / 365
  )
  for (let i = 1; i <= year; i++) {
    const anniversary = dayjs(firstDay).add(i, 'y')
    anniversaries.push({
      date: anniversary,
      comingUp: false,
      text: `${i}st anniversary`,
    })
  }
  const index = anniversaries.findIndex((anniversary) =>
    anniversary.date.isAfter(now)
  )
  anniversaries[index].comingUp = true
  return anniversaries.sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1))
}
