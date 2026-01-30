"use client";

import React, { useEffect, useState } from "react";
import { BaseTable, BaseTableColumn } from "./BaseTable";
import { fetchLists } from "@/services/api.service";

interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

interface BaseTableListProps<T = any> {
  tableName: string;
  description?: string;
  searchPlaceholder?: string;
  addNewButton?: boolean;
  columns: BaseTableColumn<T>[];
  endpoint?: string;
  addNewHandler?: () => void;
  filterComponent?: React.ReactNode;
  rowKey?: keyof T | string;
}

export function BaseTableList<T = any>({
  tableName,
  description,
  searchPlaceholder = "Search...",
  addNewButton = false,
  columns,
  endpoint,
  addNewHandler,
  filterComponent,
  rowKey = "id",
}: BaseTableListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (page = 1, searchValue = "", limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchValue) {
        params.append("search", searchValue);
      }
      if (page) {
        params.append("page", page.toString());
      }
      if (limit) {
        params.append("limit", limit.toString());
      }

      if (endpoint) {
        const response = await fetchLists({
          endpoint,
          queryString: params.toString(),
        });
        console.log("Fetched data:", response);
        setData(response.data);
        setPagination(response.pagination || null);
      }
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, search);
    // eslint-disable-next-line
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    fetchData(page, search);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">{tableName}</h2>
          {description && (
            <p className="text-gray-500 text-sm">{description}</p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {filterComponent}
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={handleSearch}
            className="border px-3 py-1 rounded-md text-sm"
          />
          {addNewButton && (
            <button
              onClick={addNewHandler}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 text-sm"
            >
              Add New
            </button>
          )}
        </div>
      </div>
      <div>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <BaseTable columns={columns} data={data} rowKey={rowKey} />
        )}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-end gap-2 items-center mt-2">
          <button
            disabled={!pagination.prevPage}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={!pagination.nextPage}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
