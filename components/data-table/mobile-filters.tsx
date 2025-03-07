"use client";
import { X } from "lucide-react";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  pageSizeOptions: number[];
  currentPageSize: number;
  onPageSizeChange: (size: number) => void;
  filters: Record<string, string>;
  localFilterValues: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  onApplyFilter: (field: string) => void;
}

export default function MobileFilters({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  pageSizeOptions,
  currentPageSize,
  onPageSizeChange,
  filters,
  localFilterValues,
  onFilterChange,
  onApplyFilter,
}: MobileFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-xs h-full p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-primary-black">Filters</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-primary-grey"
          >
            <X size={24} className="text-primary-black" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-black mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 border border-primary-black rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-black mb-1">
              Page Size
            </label>
            <select
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-2 border border-primary-black rounded w-full"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {Object.keys(filters).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-primary-black mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localFilterValues[field]}
                  onChange={(e) => onFilterChange(field, e.target.value)}
                  placeholder={`Enter ${field}...`}
                  className="px-3 py-2 border border-primary-black rounded flex-1"
                />
                <button
                  onClick={() => onApplyFilter(field)}
                  className="px-3 py-1 rounded bg-primary-yellow hover:bg-primary-blue text-primary-black"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
