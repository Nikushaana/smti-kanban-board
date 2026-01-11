"use client";

interface MinValueSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function MinValueSlider({ value, onChange }: MinValueSliderProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Minimum Value: {value}</label>
      <div className="h-10 flex items-center">
        <input
          type="range"
          min={0}
          max={100000}
          step={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
