"use client";

import React from "react";

export interface BaseTableColumn<T = any> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface BaseTableProps<T = any> {
  columns: BaseTableColumn<T>[];
  data: T[];
  rowKey?: keyof T | string;
  className?: string;
}

export function BaseTable<T = any>({
  columns,
  data,
  rowKey = "id",
  className = "",
}: BaseTableProps<T>) {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className="min-w-full border border-gray-200 bg-white rounded-md">
        <thead>
          <tr>
            {columns?.map((col) => (
              <th
                key={col.key as string}
                className={`px-4 py-2 border-b border-gray-200 text-left font-semibold bg-gray-50 ${col.align ? `text-${col.align}` : ""}`}
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns?.length}
                className="text-center py-6 text-gray-400"
              >
                No data found
              </td>
            </tr>
          ) : (
            data?.map((row, idx) => (
              <tr key={row[rowKey] ?? idx} className="hover:bg-gray-50">
                {columns?.map((col) => (
                  <td
                    key={col.key as string}
                    className="px-4 py-2 border-b border-gray-100"
                  >
                    {col.render
                      ? col.render((row as any)[col.key], row, idx)
                      : (row as any)[col.key]}
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
