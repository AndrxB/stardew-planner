import type { SeasonType } from "../components/CropSchema"

export const seasons: SeasonType[] = ["Spring", "Summer", "Fall", "Winter"]
export const MAX_DAYS = 28

export type MonthDay = {
  day       : number
  crops     : string[]
  machines  : string[]
}

export type MonthMetaData = {
  id    : string
  season: SeasonType
  year  : number
}

export type MonthData = {
  meta: MonthMetaData
  data: Record<number, MonthDay>
}

const STORAGE_KEY = "monthStorage"
const STORAGE_VERSION = "1.1"

export const getCalendarKey = (meta: MonthMetaData) =>
  `_v${STORAGE_VERSION}:key_${STORAGE_KEY}:id_${meta.id}:season_${meta.season}:year_${meta.year}`

export const createDefaultCalendar = (
  size: number = MAX_DAYS
): Record<number, MonthDay> => {
  return Object.fromEntries(
    Array.from({ length: size }, (_, index) => {
      const day = index + 1

      return [
        day,
        {
          day,
          crops: [],
          machines: [],
        },
      ]
    })
  )
}

export const createDefaultMonth = (meta: MonthMetaData): MonthData => {
  return {
    meta,
    data: createDefaultCalendar(MAX_DAYS),
  }
}

export const monthStorage = {
  setMonth(month: MonthData): MonthData {
    const key = getCalendarKey(month.meta)

    localStorage.setItem(key, JSON.stringify(month))

    return month
  },

  getMonth(meta: MonthMetaData): MonthData {
    const key = getCalendarKey(meta)
    const raw = localStorage.getItem(key)

    if (!raw) {
      return createDefaultMonth(meta)
    }

    try {
      return JSON.parse(raw) as MonthData
    } catch {
      return createDefaultMonth(meta)
    }
  },

  clearMonth(meta: MonthMetaData) {
    const key = getCalendarKey(meta)

    localStorage.removeItem(key)
  },

  updateDay(meta: MonthMetaData, updatedDay: MonthDay): MonthData {
    const month = this.getMonth(meta)

    const updatedMonth: MonthData = {
      ...month,
      data: {
        ...month.data,
        [updatedDay.day]: updatedDay,
      },
    }

    this.setMonth(updatedMonth)

    return updatedMonth
  },
}