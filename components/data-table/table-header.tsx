"use client";

import type React from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import FilterDropdown from "./filter-dropdown";

interface TableHeaderProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showPageSizeDropdown: boolean;
  setShowPageSizeDropdown: (show: boolean) => void;
  pageSizeOptions: number[];
  currentPageSize: number;
  onPageSizeChange: (size: number) => void;
  filters: Record<string, string>;
  localFilterValues: Record<string, string>;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  onFilterChange: (field: string, value: string) => void;
  onApplyFilter: (field: string) => void;
  onClearFilter: (field: string) => void;
  onShowMobileFilters: () => void;
  pageSizeRef: React.RefObject<HTMLDivElement>;
  filterRef: React.RefObject<HTMLDivElement>;
}

export default function TableHeader({
  showSearch,
  setShowSearch,
  searchTerm,
  onSearchChange,
  showPageSizeDropdown,
  setShowPageSizeDropdown,
  pageSizeOptions,
  currentPageSize,
  onPageSizeChange,
  filters,
  localFilterValues,
  activeFilter,
  setActiveFilter,
  onFilterChange,
  onApplyFilter,
  onClearFilter,
  onShowMobileFilters,
  pageSizeRef,
  filterRef,
}: TableHeaderProps) {
  return (
    <div className="p-4 bg-primary-grey border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">

        <button
          onClick={onShowMobileFilters}
          className="md:hidden p-2 rounded-full hover:bg-primary-blue"
        >
          <Filter size={20} className="text-primary-black" />
        </button>

        <div className="relative hidden md:block" ref={pageSizeRef}>
          <button
            onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-primary-black text-primary-black"
          >
            Page Size: {currentPageSize} <ChevronDown size={16} />
          </button>
          {showPageSizeDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-primary-black rounded shadow-lg z-10">
              {pageSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => onPageSizeChange(size)}
                  className="block w-full text-left px-4 py-2 hover:bg-primary-blue"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="items-center gap-2 hidden md:flex">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-primary-blue"
          >
            <Search size={20} className="text-primary-black" />
          </button>
          {showSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 border border-primary-black rounded"
              autoFocus
            />
          )}
        </div>
      </div>

      <div className="flex-wrap gap-2 hidden md:flex" ref={filterRef}>
        {Object.keys(filters).map((field) => (
          <div key={field} className="relative">
            <button
              onClick={() => {
                setActiveFilter(activeFilter === field ? null : field);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded border text-primary-black ${
                filters[field]
                  ? "bg-primary-yellow border-primary-black"
                  : "bg-white border-primary-black"
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {filters[field] && (
                <span className="ml-1">: {filters[field]}</span>
              )}
              <ChevronDown size={16} />
            </button>
            {activeFilter === field && (
              <FilterDropdown
                field={field}
                value={localFilterValues[field]}
                onChange={(value) => onFilterChange(field, value)}
                onApply={() => onApplyFilter(field)}
                onClear={() => onClearFilter(field)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
