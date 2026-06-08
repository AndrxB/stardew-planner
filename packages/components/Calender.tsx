import { useMemo, useState } from "react"

import DayModal from "./DayModal"
import type { SeasonType } from "./CropSchema"

import {
  monthStorage,
  type MonthData,
  type MonthDay,
  type MonthMetaData,
} from "../storage/calenderStorage"

type CalendarProps = {
  year: number
  calendarId?: string
  initialSeason?: SeasonType
  showHeader?: boolean
  showNav?: boolean
}

export default function Calendar({
  year,
  calendarId = "main",
  initialSeason = "Spring",
}: CalendarProps) {


  const currentMeta = useMemo<MonthMetaData>(
    () => ({
      id: calendarId,
      year,
      season: initialSeason,
    }),
    [calendarId, year]
  )

  const [calendar, setCalendarState] = useState<MonthData>(() =>
    monthStorage.getMonth(currentMeta)
  )

  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calendarDays = useMemo(() => {
    return Object.values(calendar.data).sort((a, b) => a.day - b.day)
  }, [calendar])

  const selectedDayFromCalendar = useMemo(() => {
    if (selectedDayNumber === null) return null

    return calendar.data[selectedDayNumber] ?? null
  }, [calendar, selectedDayNumber])

  const openDayModal = (day: MonthDay) => {
    setSelectedDayNumber(day.day)
    setIsModalOpen(true)
  }

  const closeDayModal = () => {
    setIsModalOpen(false)
    setSelectedDayNumber(null)
  }

  const handleSaveDay = (updatedDay: MonthDay) => {
    const updatedMonth = monthStorage.updateDay(currentMeta, updatedDay)

    setCalendarState(updatedMonth)
    closeDayModal()
  }

  return (
    <div>
      <div className="overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/30">
        <div className="grid grid-cols-7 border-y-2 border-slate-800 bg-slate-700 px-2 py-2 text-center text-sm font-bold uppercase tracking-wide text-orange-100">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>Th</div>
          <div>F</div>
          <div>Sa</div>
          <div>Su</div>
        </div>

        <div className="grid grid-cols-7 bg-slate-900">
          {calendarDays.map((day) => (
            <CalendarDay
              key={day.day}
              {...day}
              onClick={() => openDayModal(day)}
            />
          ))}
        </div>
      </div>

      <DayModal
        open={isModalOpen}
        day={selectedDayFromCalendar}
        season={calendar.meta.season}
        onClose={closeDayModal}
        onSave={handleSaveDay}
      />
    </div>
  )
}

type CalendarDayProps = MonthDay & {
  onClick: () => void
}

const CalendarDay = ({ day, crops, machines, onClick }: CalendarDayProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-h-28 cursor-pointer flex-col bg-slate-800 p-4 text-left transition-colors hover:bg-slate-700"
    >
      <div className="font-semibold">{day}</div>

      {crops.length > 0 && (
        <div className="mt-2">
          <div className="text-xs text-slate-400">Crops</div>
          {crops.map((crop, i) => (
            <div key={`crop-${day}-${i}`} className="text-sm">
              {crop}
            </div>
          ))}
        </div>
      )}

      {machines.length > 0 && (
        <div className="mt-2">
          <div className="text-xs text-slate-400">Machines</div>
          {machines.map((machine, i) => (
            <div key={`machine-${day}-${i}`} className="text-sm">
              {machine}
            </div>
          ))}
        </div>
      )}
    </button>
  )
}