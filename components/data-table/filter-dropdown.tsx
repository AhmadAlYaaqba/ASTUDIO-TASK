"use client";

interface FilterDropdownProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function FilterDropdown({
  field,
  value,
  onChange,
  onApply,
  onClear,
}: FilterDropdownProps) {
  return (
    <div className="absolute top-full left-0 mt-1 bg-white border border-primary-black rounded shadow-lg z-10 p-2 min-w-[200px]">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-primary-black">
          Filter by {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field}...`}
          className="px-3 py-2 border border-primary-black rounded text-sm w-full"
          autoFocus
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClear}
            className="px-3 py-1 text-sm rounded bg-primary-grey hover:bg-primary-blue text-primary-black"
          >
            Clear
          </button>
          <button
            onClick={onApply}
            className="px-3 py-1 text-sm rounded bg-primary-yellow hover:bg-primary-blue text-primary-black"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
