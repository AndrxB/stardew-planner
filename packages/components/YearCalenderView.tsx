import { useState } from "react"
import { seasons } from "../storage/calenderStorage"
import Calendar from "./Calender"
import type { SeasonType } from "./CropSchema"
import { H2 } from "../ui/typography"
import Button from "../ui/Button"
import Minus from "../assets/icons/minus_zoom_icon.png"
import Plus from "../assets/icons/plus_zoom_icon.png"
import { cn } from "../ui/utils"

type YearCalendarViewProps = {
  year: number
  calendarId?: string
}

const YEAR_VIEW_VERSION = "1"
const LAST_CLICKED_YEAR_KEY = `${YEAR_VIEW_VERSION}_last_clicked_year:`


const localTrackerStorage = {
  getLastClickedSeason(key: string) : SeasonType {
    var out = localStorage.getItem(key)
    return out ? JSON.parse(out) : "Spring"
  },
  setLastClickedSeason(key: string, season: SeasonType) : SeasonType {
    localStorage.setItem(key, JSON.stringify(season))
    return season
  },
  getLastClickedYear(key: string) : number {
    var out = localStorage.getItem(key)
    return out ? JSON.parse(out) : 0
  },
  setLastClickedYear(key: string, year: number) : number {
    localStorage.setItem(key, JSON.stringify(year))
    return year
  },
}


export default function YearCalendarView({
  calendarId = "main",
}: YearCalendarViewProps) {
  const storageKey = (storageType: StorageType) => `_v_${YEAR_VIEW_VERSION}:id_${calendarId}:${LAST_CLICKED_YEAR_KEY}_${storageType}`
  
  const[year, setYear] = useState(localTrackerStorage.getLastClickedYear(storageKey("year")))
  const[season, setSeason] = useState<SeasonType>(localTrackerStorage.getLastClickedSeason(storageKey("season")))

  type StorageType = "season" | "year"

  const nextYear = () => {
    setYear( old => localTrackerStorage.setLastClickedYear(storageKey("year"), old+1))
  }

  const previousYear = () => {
    setYear(old => localTrackerStorage.setLastClickedYear(storageKey("year"), old == 0 ? 0 : old-1))
  }

  const selectSeason = (newSeason: SeasonType) => {
    if (newSeason != season)
      setSeason(localTrackerStorage.setLastClickedSeason(storageKey("season"), newSeason))
  }

  return (
    <div className="">
      <nav className="grid grid-cols-7 border-slate-700 m-2">
        <H2 className="col-start-1 whitespace-nowrap">
          {season}
        </H2>

        <H2 className="col-start-3">
          Year: {year}
        </H2>
        <div className="flex flex-row gap-2 col-start-7 col-span-1 self-end">
          <Button variant={"zoom"} onClick={previousYear} disabled={year === 0}>
            <img src={Minus} width={28} className="cursor-pointer block [image-rendering:pixelated]"/>
          </Button>
          <Button variant={"zoom"} onClick={nextYear}>
            <img src={Plus} width={28} className="cursor-pointer [image-rendering:pixelated]"/>
          </Button>
          
        </div>
      </nav>
      
      <nav className="bg-slate-800 grid grid-cols-4 rounded-t-2xl">
        {seasons.map(seasonType => {
          return (
            <div 
              onClick={() => selectSeason(seasonType)} 
              className={cn("py-2 rounded-t-2xl cursor-pointer", seasonType == season && "bg-amber-950 cursor-auto")}
            >
              {seasonType}
            </div>
          )
        })}
      </nav>
      <Calendar key={calendarId+year+season} calendarId={calendarId} year={year} initialSeason={season}  />
    </div>
  )
}