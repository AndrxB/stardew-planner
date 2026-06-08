import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import type { MonthDay } from "../storage/calenderStorage";
import { getSeasonalCrops, type Plantable, type SeasonType } from "./CropSchema";

type DayModalProps = {
  open: boolean;
  day: MonthDay | null;
  season: SeasonType
  onClose: () => void;
  onSave: (updatedDay: MonthDay) => void;
};

const DayModal = ({ open, day, onClose, onSave, season = "Spring" }: DayModalProps) => {
  const [cropsInput, setCropsInput] = useState("");
  const [machinesInput, setMachinesInput] = useState("");

  useEffect(() => {
    if (!day) {
      setCropsInput("");
      setMachinesInput("");
      return;
    }

    setCropsInput(day.crops.join(", "));
    setMachinesInput(day.machines.join(", "));
  }, [day]);

  const handleSave = () => {
    if (!day) return;

    const updatedDay: MonthDay = {
      ...day,
      crops: splitCsvInput(cropsInput),
      machines: splitCsvInput(machinesInput),
    };

    onSave(updatedDay);
  };

  const seasonalCrops = getSeasonalCrops(season)

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-700">
          <DialogTitle className="text-lg font-semibold mb-4">
            {day ? `Edit Day ${day.day}` : "Edit Day"}
          </DialogTitle>

          <div hidden className="flex bg-slate-800">
            <img src={`/seeds/Jazz_Seeds.png`} />
            <select>
              <option selected disabled hidden>Select {season} crop </option>
              { seasonalCrops.map(crop => {
                return (
                  <div className="flex flex-row">
                    <img src={`/seeds/${crop.seedName.replaceAll(" ", "_")}.png`}/>
                    <option value={crop.cropName}>{crop.cropName} </option>
                  </div>
                )
              })}
            </select>
            <input type="number" min={1} />
          </div>

          <div className="flex flex-col gap-4">
            
            <DropDownSelect value={cropsInput} crops={seasonalCrops} onSubmit={crop => setCropsInput(crop)} /> 



            <div hidden>
              <label htmlFor="crops" className="block text-sm mb-1">
                Crops
              </label>
              <input
                id="crops"
                value={cropsInput}
                onChange={(e) => setCropsInput(e.target.value)}
                placeholder="e.g. Wheat, Corn"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none"
              />
            </div>

            <div hidden>
              <label htmlFor="machines" className="block text-sm mb-1">
                Machines
              </label>
              <input
                id="machines"
                value={machinesInput}
                onChange={(e) => setMachinesInput(e.target.value)}
                placeholder="e.g. Tractor, Harvester"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

type DropDownSelectProps = {
  value: string
  crops: Plantable[];
  onSubmit: (crop: string) => void
}

const DropDownSelect = ({
  value = "Select Crop",
  crops,
  onSubmit
}: DropDownSelectProps) => {
  const [open, setOpen] = useState(false)
  
  const handleOnSubmit = (crop: string) => {
    setOpen(false)
    onSubmit(crop)
  }

  
  return(
    <div className="mx-auto flex flex-col bg-500">
      <span>{value}</span>
      { open && crops.map( plantable => {
        return(
          <Button onSubmit={() => handleOnSubmit(plantable.seedName) }>
            <img src={`/seeds/${plantable.seedName.replace(" ", "_")}.png`}/>
            {plantable.seedName}
          </Button>
        )
      })}
    </div>
  )
}

const splitCsvInput = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default DayModal;