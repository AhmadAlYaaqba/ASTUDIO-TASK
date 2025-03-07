"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import {
  fetchUsers,
  setLimit,
  setSkip,
  setSearchTerm,
  setFilter,
} from "@/lib/features/users/usersSlice";
import DataTable from "@/components/data-table";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, skip, limit, loading, searchTerm, filters } =
    useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, skip, limit, filters]);

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

  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "username", label: "Username" },
    { key: "birthDate", label: "Birth Date" },
    {
      key: "address",
      label: "Address",
      render: (value: any) => `${value.address}, ${value.city}, ${value.state}`,
    },
    {
      key: "company",
      label: "Company",
      render: (value: any) => `${value.name} (${value.department})`,
    },
    {
      key: "image",
      label: "Image",
      render: (value: string) => (
        <img
          src={value || "/placeholder.svg"}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-black">Users</h1>

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
