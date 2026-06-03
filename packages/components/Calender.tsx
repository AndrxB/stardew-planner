import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import { H1, H2 } from "../ui/typography"
import { cn } from "../ui/utils";
import DayModal from "./DayModal";
import type { SeasonType } from "./CropSchema";


type CropType = string;
type MachineType = string;

export type CalendarDayType = {
  day: number;
  crops: CropType[];
  machines: MachineType[];
};

const STORAGE_VERSION = 1;

export default function Calendar() {
  const seasons: SeasonType[] = ["Spring", "Summer", "Fall", "Winter"];
  const MAX_DAYS = 28;

  const LAST_CLICKED_SEASON_KEY = "calendar_lastClickedSeason";
  const LAST_CLICKED_YEAR_KEY = "calendar_lastClickedYear";

  const getCalendarKey = (year: number, season: SeasonType) =>
    `_v${STORAGE_VERSION}_year:${year}_season:${season}`;

  const createDefaultCalendar = (): CalendarDayType[] =>
    Array.from({ length: MAX_DAYS }, (_, i) => ({
      day: i + 1,
      crops: [],
      machines: [],
    }));

  const isCalendarDayTypeArray = (value: unknown): value is CalendarDayType[] => {
    return (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "day" in item &&
          typeof item.day === "number" &&
          "crops" in item &&
          Array.isArray((item as CalendarDayType).crops) &&
          "machines" in item &&
          Array.isArray((item as CalendarDayType).machines)
      )
    );
  };

  const getCalendar = (year: number, season: SeasonType): CalendarDayType[] => {
    const raw = localStorage.getItem(getCalendarKey(year, season));

    if (!raw) return createDefaultCalendar();

    try {
      const parsed: unknown = JSON.parse(raw);
      return isCalendarDayTypeArray(parsed) ? parsed : createDefaultCalendar();
    } catch {
      return createDefaultCalendar();
    }
  };

  const setCalendar = (year: number, season: SeasonType, calendar: CalendarDayType[]) => {
    localStorage.setItem(getCalendarKey(year, season), JSON.stringify(calendar));
  };

  const getLastClickedSeason = (): SeasonType => {
    const raw = localStorage.getItem(LAST_CLICKED_SEASON_KEY);
    if (!raw) return "Spring";

    try {
      const parsed: unknown = JSON.parse(raw);
      return seasons.includes(parsed as SeasonType) ? (parsed as SeasonType) : "Spring";
    } catch {
      return "Spring";
    }
  };

  const setLastClickedSeason = (season: SeasonType) => {
    localStorage.setItem(LAST_CLICKED_SEASON_KEY, JSON.stringify(season));
  };

  const getLastClickedYear = (): number => {
    const raw = localStorage.getItem(LAST_CLICKED_YEAR_KEY);
    if (!raw) return 0;

    try {
      const parsed: unknown = JSON.parse(raw);
      return typeof parsed === "number" && parsed >= 0 ? parsed : 0;
    } catch {
      return 0;
    }
  };

  const setLastClickedYear = (year: number) => {
    localStorage.setItem(LAST_CLICKED_YEAR_KEY, JSON.stringify(year));
  };

  const [currentSeason, setCurrentSeason] = useState<SeasonType>(() => getLastClickedSeason());
  const [yearNumber, setYearNumber] = useState<number>(() => getLastClickedYear());
  const [calendar, setCalendarState] = useState<CalendarDayType[]>(() =>
    getCalendar(getLastClickedYear(), getLastClickedSeason())
  );

  const [selectedDay, setSelectedDay] = useState<CalendarDayType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCalendarState(getCalendar(yearNumber, currentSeason));
    setLastClickedSeason(currentSeason);
    setLastClickedYear(yearNumber);
  }, [currentSeason, yearNumber]);

  const selectedDayNumber = selectedDay?.day ?? null;

  const selectedDayFromCalendar = useMemo(() => {
    if (selectedDayNumber === null) return null;
    return calendar.find((d) => d.day === selectedDayNumber) ?? null;
  }, [calendar, selectedDayNumber]);

  const nextYear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setYearNumber((year) => year + 1);
  };

  const previousYear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setYearNumber((year) => (year - 1 >= 0 ? year - 1 : 0));
  };

  const onSeasonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    season: SeasonType
  ) => {
    e.preventDefault();
    setCurrentSeason(season);
  };

  const openDayModal = (day: CalendarDayType) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeDayModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const handleSaveDay = (updatedDay: CalendarDayType) => {
    const updatedCalendar = calendar.map((day) =>
      day.day === updatedDay.day ? updatedDay : day
    );

    setCalendar(yearNumber, currentSeason, updatedCalendar);
    setCalendarState(updatedCalendar);
    closeDayModal();
  };

  return (
  <div>
    <nav className=" grid grid-cols-7 items-center border-slate-700 p-2">
      <H2 className="col-start-1 whitespace-nowrap">
        {currentSeason}
      </H2>

      <H2 className="col-start-3">
        Year: {yearNumber}
      </H2>

      <div className="-col-end-1 flex justify-end gap-2">
        <Button
          type="button"
          variant="zoom"
          onClick={previousYear}
          disabled={yearNumber === 0}
        >
          <Minus />
        </Button>

        <Button type="button" variant="zoom" onClick={nextYear}>
          <Plus />
        </Button>
      </div>
    </nav>

    <div className="overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/30">
      <nav className="grid grid-cols-4 gap-2 bg-slate-700 p-2">
        {seasons.map((season) => {
          const isActive = currentSeason === season;

          return (
            <Button
              key={season}
              type="button"
              onClick={(e) => onSeasonClick(e, season)}
              className={cn(
                "rounded-xl rounded-b-none px-4 py-3 font-semibold transition-all duration-200",
                "bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-white",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
                isActive &&
                  "bg-slate-950 text-white hover:bg-slate-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.06)]"
              )}
            >
              {season}
            </Button>
          );
        })}
      </nav>

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
        {calendar.map((day) => (
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
      onClose={closeDayModal}
      onSave={handleSaveDay}
    />
  </div>
);
}

type CalendarDayProps = CalendarDayType & {
  onClick: () => void;
};

const CalendarDay = ({ day, crops, machines, onClick }: CalendarDayProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative min-h-28 cursor-pointer bg-slate-800 p-4 text-left flex flex-col hover:bg-slate-700 transition-colors"
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
  );
};

