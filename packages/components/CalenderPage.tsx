import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import Button from "../ui/Button"
import Calendar from "./Calender"


const LAST_CLICKED_YEAR_KEY = "calendar_lastClickedYear"

const getLastClickedYear = (): number => {
  const raw = localStorage.getItem(LAST_CLICKED_YEAR_KEY)
  if (!raw) return 0

  try {
    const parsed: unknown = JSON.parse(raw)

    return typeof parsed === "number" && parsed >= 0 ? parsed : 0
  } catch {
    return 0
  }
}

const setLastClickedYear = (year: number) => {
  localStorage.setItem(LAST_CLICKED_YEAR_KEY, JSON.stringify(year))
}

export default function CalendarPage() {
  const [year, setYear] = useState(() => getLastClickedYear())

  const nextYear = () => {
    setYear((currentYear) => {
      const next = currentYear + 1
      setLastClickedYear(next)
      return next
    })
  }

  const previousYear = () => {
    setYear((currentYear) => {
      const previous = Math.max(0, currentYear - 1)
      setLastClickedYear(previous)
      return previous
    })
  }

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="zoom"
          onClick={previousYear}
          disabled={year === 0}
        >
          <Minus />
        </Button>

        <Button type="button" variant="zoom" onClick={nextYear}>
          <Plus />
        </Button>
      </div>

      <Calendar year={year} calendarId="main" />
    </div>
  )
}