"use client";

import React, { useEffect, useState } from "react";
import { BaseTable, Column } from "./BaseTable";
import { fetchLists } from "@/services/api.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

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
  columns: Column<T>[];
  endpoint?: string;
  addNewHandler?: () => void;
  filterComponent?: React.ReactNode;
  getRowKey: (item: T) => string | number;
  emptyMessage?: string;
  rowClassName?: (item: T) => string;
  // Checkbox props
  enableCheckbox?: boolean;
  checkboxCondition?: (item: T) => boolean;
  selectedRows?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
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
  getRowKey,
  emptyMessage = "No data available",
  rowClassName,
  enableCheckbox = false,
  checkboxCondition,
  selectedRows = [],
  onSelectionChange,
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
    <div>
      <Card className="space-y-4">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>{tableName}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchData(1, search)}
                className="cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" />
              </Button>
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
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <BaseTable
              columns={columns}
              data={data}
              isLoading={loading}
              emptyMessage={emptyMessage}
              getRowKey={getRowKey}
              rowClassName={rowClassName}
              enableCheckbox={enableCheckbox}
              checkboxCondition={checkboxCondition}
              selectedRows={selectedRows}
              onSelectionChange={onSelectionChange}
            />
          )}
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </div>
  );
}
