"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Search by client name</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search e.g. Nova, Roche.."
        className="outline-none border border-gray-400 rounded-lg h-10 px-2 bg-white shadow-md text-[15px]"
      />
    </div>
  );
}
