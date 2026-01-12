"use client";

import { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";

interface DateRangePickerProps {
  selectionRange: { startDate: Date; endDate: Date; key: string };
  onChange: (range: { startDate: Date; endDate: Date; key: string }) => void;
}

export default function DateRangePicker({
  selectionRange,
  onChange,
}: DateRangePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection.startDate && selection.endDate) {
      onChange(selection as { startDate: Date; endDate: Date; key: string });
    }
  };

  // close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Date Range</label>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full h-10 border border-gray-400 rounded-lg px-2 bg-white shadow-md text-left text-[15px]"
        >
          {dayjs(selectionRange.startDate).format("DD.MM.YYYY") +
            " - " +
            dayjs(selectionRange.endDate).format("DD.MM.YYYY")}
        </button>
      </div>

      {showCalendar && (
        <div className="absolute z-50 mt-2 left-1/2 transform -translate-x-1/2 shadow p-2 bg-white rounded-lg">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
          />
        </div>
      )}
    </div>
  );
}
