"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Pagination from "../pagination";
import TableHeader from "./table-header";
import TableContent from "./table-content";
import MobileFilters from "./mobile-filters";
import ActiveFilters from "./active-filters";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
}

export default function DataTable({
  columns,
  data,
  total,
  skip,
  limit,
  loading,
  onPageChange,
  onLimitChange,
  onSearch,
  searchTerm,
  filters,
  onFilterChange,
}: DataTableProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [localFilterValues, setLocalFilterValues] =
    useState<Record<string, string>>(filters);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [filteredData, setFilteredData] = useState(data);

  const pageSizeOptions = [5, 10, 20, 50];
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const filterRef = useRef<HTMLDivElement>(null);
  const pageSizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalFilterValues(filters);
  }, [filters]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!localSearchTerm) {
      setFilteredData(data);
      return;
    }

    const term = localSearchTerm.toLowerCase();
    const filtered = data.filter((row) => {
      return columns.some((column) => {
        const value = row[column.key];
        if (value === null || value === undefined) return false;

        if (typeof value === "object") {
          return JSON.stringify(value).toLowerCase().includes(term);
        }

        return String(value).toLowerCase().includes(term);
      });
    });

    setFilteredData(filtered);
  }, [data, localSearchTerm, columns]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
        setLocalFilterValues(filters);
      }
      if (
        pageSizeRef.current &&
        !pageSizeRef.current.contains(event.target as Node)
      ) {
        setShowPageSizeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filters]);

  const handlePageSizeChange = (size: number) => {
    onLimitChange(size);
    setShowPageSizeDropdown(false);
  };

  const handleLocalFilterChange = (field: string, value: string) => {
    setLocalFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilter = (field: string) => {
    onFilterChange(field, localFilterValues[field]);
    setActiveFilter(null);
    setShowMobileFilters(false);
  };

  const clearFilter = (field: string) => {
    setLocalFilterValues((prev) => ({
      ...prev,
      [field]: "",
    }));
    onFilterChange(field, "");
    setActiveFilter(null);
  };

  const handleLocalSearch = (value: string) => {
    setLocalSearchTerm(value);
    const debounceTimer = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(debounceTimer);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <MobileFilters
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        searchTerm={localSearchTerm}
        onSearchChange={handleLocalSearch}
        pageSizeOptions={pageSizeOptions}
        currentPageSize={limit}
        onPageSizeChange={handlePageSizeChange}
        filters={filters}
        localFilterValues={localFilterValues}
        onFilterChange={handleLocalFilterChange}
        onApplyFilter={applyFilter}
      />

      <TableHeader
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchTerm={localSearchTerm}
        onSearchChange={handleLocalSearch}
        showPageSizeDropdown={showPageSizeDropdown}
        setShowPageSizeDropdown={setShowPageSizeDropdown}
        pageSizeOptions={pageSizeOptions}
        currentPageSize={limit}
        onPageSizeChange={handlePageSizeChange}
        filters={filters}
        localFilterValues={localFilterValues}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onFilterChange={handleLocalFilterChange}
        onApplyFilter={applyFilter}
        onClearFilter={clearFilter}
        onShowMobileFilters={() => setShowMobileFilters(true)}
        pageSizeRef={pageSizeRef}
        filterRef={filterRef}
      />

      <ActiveFilters
        filters={filters}
        searchTerm={localSearchTerm}
        onClearFilter={clearFilter}
        onClearSearch={() => handleLocalSearch("")}
      />

      <TableContent columns={columns} data={filteredData} loading={loading} />

      <div className="p-4 bg-primary-grey border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
