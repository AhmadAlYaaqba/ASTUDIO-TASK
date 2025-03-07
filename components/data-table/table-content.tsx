import type React from "react";
import Spinner from "../spinner";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableContentProps {
  columns: Column[];
  data: any[];
  loading: boolean;
}

export default function TableContent({
  columns,
  data,
  loading,
}: TableContentProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary-blue text-primary-black">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-left font-bold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                <Spinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-primary-black"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                className={`border-b border-primary-grey ${
                  index % 2 === 0 ? "bg-white" : "bg-primary-grey"
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className="px-4 py-3 text-primary-black"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : typeof row[column.key] === "object"
                      ? JSON.stringify(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
