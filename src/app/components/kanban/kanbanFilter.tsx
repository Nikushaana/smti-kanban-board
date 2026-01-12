"use client";

import { useEffect, useState } from "react";
import SearchInput from "../inputs/SearchInput";
import DateRangePicker from "../inputs/dateRangePicker";
import MinValueSlider from "../inputs/minValueSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { normalizeRange } from "@/app/lib/dateUtils";

export default function KanbanFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterValues, setFilterValues] = useState({
    clientName: searchParams.get("clientName") || "",
    minValue: Number(searchParams.get("minValue") || 0),
  });

  const [selectionRange, setSelectionRange] = useState(() =>
  normalizeRange({
    startDate: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : new Date(),
    endDate: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : new Date(),
    key: "selection",
  })
);

  // Debounce updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateURL();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filterValues.clientName, filterValues.minValue, selectionRange]);

  // Function to update URL params
  const updateURL = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterValues.clientName) {
      params.set("clientName", filterValues.clientName);
    } else {
      params.delete("clientName");
    }

    if (filterValues.minValue > 0) {
      params.set("minValue", filterValues.minValue.toString());
    } else {
      params.delete("minValue");
    }

    if (
      selectionRange.startDate.toDateString() !== new Date().toDateString() ||
      selectionRange.endDate.toDateString() !== new Date().toDateString()
    ) {
      params.set("startDate", selectionRange.startDate.toISOString());
      params.set("endDate", selectionRange.endDate.toISOString());
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }

    // Only replace URL if it changed
    const newUrl = `?${params.toString()}`;
    if (newUrl !== window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  };

  // Count how many filters are currently active
  const count =
    (filterValues.clientName ? 1 : 0) +
    (selectionRange.startDate.toDateString() !== new Date().toDateString() ||
    selectionRange.endDate.toDateString() !== new Date().toDateString()
      ? 1
      : 0) +
    (filterValues.minValue > 0 ? 1 : 0);

  // Reset all filters to default
  const clearFilters = () => {
    setFilterValues({ clientName: "", minValue: 0 });
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <div className="bg-purple-300 p-5 rounded-[10px] shadow-md hover:shadow-lg duration-100 flex flex-col gap-y-4 ">
      <h1 className="text-2xl font-bold">Filter Panel</h1>
      <div className="grid grid-cols-3 gap-10">
        <SearchInput
          value={filterValues.clientName}
          onChange={(val) =>
            setFilterValues((prev) => ({ ...prev, clientName: val }))
          }
        />

        <DateRangePicker
          selectionRange={selectionRange}
          onChange={(range) => setSelectionRange(normalizeRange(range))}
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
