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
  const now = dayjs(new Date())
  let anniversaries = []
  const day50 = dayjs(firstDay).add(49, 'd')
  let setComingUp = day50.isAfter(now)
  anniversaries.push({ date: day50, comingUp: setComingUp })
  for (let i = 1; i < maxLength; i++) {
    const anniversary = dayjs(firstDay)
      .add(i * 100, 'd')
      .add(-1, 'd')
    if (!setComingUp) {
      setComingUp = dayjs(anniversary).isAfter(now)
      anniversaries.push({ date: anniversary, comingUp: setComingUp })
    } else {
      anniversaries.push({ date: anniversary, comingUp: false })
    }
  }
  return anniversaries
}
