"use client";

import { useState } from "react";
import SearchInput from "../inputs/SearchInput";
import DateRangePicker from "../inputs/dateRangePicker";
import MinValueSlider from "../inputs/minValueSlider";

export default function KanbanFilter() {
  const [filterValues, setFilterValues] = useState({
    query: "",
    minValue: 0,
  });

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Count how many filters are currently active
  const count =
    (filterValues.query ? 1 : 0) +
    (selectionRange.startDate.toDateString() !== new Date().toDateString() ||
    selectionRange.endDate.toDateString() !== new Date().toDateString()
      ? 1
      : 0) +
    (filterValues.minValue > 0 ? 1 : 0);

  // Reset all filters to default
  const clearFilters = () => {
    setFilterValues({ query: "", minValue: 0 });
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <div className="bg-gray-200 p-5 rounded-[10px] flex flex-col gap-y-4 ">
      <h1 className="text-2xl font-bold">Filter Panel</h1>
      <div className="grid grid-cols-3 gap-10">
        <SearchInput
          value={filterValues.query}
          onChange={(val) =>
            setFilterValues((prev) => ({ ...prev, query: val }))
          }
        />

        <DateRangePicker
          selectionRange={selectionRange}
          onChange={setSelectionRange}
        />

        <MinValueSlider
          value={filterValues.minValue}
          onChange={(val) =>
            setFilterValues((prev) => ({ ...prev, minValue: val }))
          }
        />
      </div>
      <button
        onClick={clearFilters}
        className={`text-sm text-red-500 underline hover:text-red-700 cursor-pointer self-center duration-200 ${
          count == 0 ? "h-0 opacity-0 pointer-events-none " : "h-5"
        }`}
      >
        Clear {count} Filters
      </button>
    </div>
  );
}
