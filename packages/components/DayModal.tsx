import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/Button";
import type { CalendarDayType } from "./Calender";
import { useEffect, useState } from "react";

type DayModalProps = {
  open: boolean;
  day: CalendarDayType | null;
  onClose: () => void;
  onSave: (updatedDay: CalendarDayType) => void;
};

const DayModal = ({ open, day, onClose, onSave }: DayModalProps) => {
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

    const updatedDay: CalendarDayType = {
      ...day,
      crops: splitCsvInput(cropsInput),
      machines: splitCsvInput(machinesInput),
    };

    onSave(updatedDay);
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-700">
          <DialogTitle className="text-lg font-semibold mb-4">
            {day ? `Edit Day ${day.day}` : "Edit Day"}
          </DialogTitle>

          <div className="flex flex-col gap-4">
            <div>
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

            <div>
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

const splitCsvInput = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default DayModal;