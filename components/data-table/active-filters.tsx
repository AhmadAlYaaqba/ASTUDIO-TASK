"use client";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: Record<string, string>;
  searchTerm: string;
  onClearFilter: (field: string) => void;
  onClearSearch: () => void;
}

export default function ActiveFilters({
  filters,
  searchTerm,
  onClearFilter,
  onClearSearch,
}: ActiveFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value);

  if (activeFilters.length === 0 && !searchTerm) {
    return null;
  }

  return (
    <div className="md:hidden p-2 flex flex-wrap gap-2">
      {activeFilters.map(([field, value]) => (
        <div
          key={field}
          className="bg-primary-yellow px-2 py-1 rounded-full text-xs flex items-center"
        >
          <span>
            {field}: {value}
          </span>
          <button onClick={() => onClearFilter(field)} className="ml-1">
            <X size={14} />
          </button>
        </div>
      ))}
      {searchTerm && (
        <div className="bg-primary-blue px-2 py-1 rounded-full text-xs flex items-center">
          <span>Search: {searchTerm}</span>
          <button onClick={onClearSearch} className="ml-1">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
