"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import {
  fetchProducts,
  setLimit,
  setSkip,
  setSearchTerm,
  setFilter,
  setActiveTab,
} from "@/lib/features/products/productsSlice";
import DataTable from "@/components/data-table";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, skip, limit, loading, searchTerm, filters, activeTab } =
    useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, skip, limit, filters, activeTab]);

  const handlePageChange = (page: number) => {
    dispatch(setSkip((page - 1) * limit));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter({ field: field as keyof typeof filters, value }));
  };

  const handleTabChange = (tab: "ALL" | "Laptops") => {
    dispatch(setActiveTab(tab));
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price", render: (value: number) => `$${value}` },
    {
      key: "discountPercentage",
      label: "Discount",
      render: (value: number) => `${value}%`,
    },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
    {
      key: "thumbnail",
      label: "Thumbnail",
      render: (value: string) => (
        <img
          src={value || "/placeholder.svg"}
          alt="Product"
          className="w-16 h-12 object-cover rounded"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-black">Products</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleTabChange("ALL")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "ALL"
              ? "bg-primary-yellow text-primary-black"
              : "bg-primary-grey hover:bg-primary-blue text-primary-black"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => handleTabChange("Laptops")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "Laptops"
              ? "bg-primary-yellow text-primary-black"
              : "bg-primary-grey hover:bg-primary-blue text-primary-black"
          }`}
        >
          Laptops
        </button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        total={total}
        skip={skip}
        limit={limit}
        loading={loading}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
