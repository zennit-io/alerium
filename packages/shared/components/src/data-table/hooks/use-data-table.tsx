import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ObjectWithPossibleOptionalKeys } from "@zenncore/types";
import { useState } from "react";
import type { TableRow } from "../types";

export type UseDataTableParams<T extends TableRow> = {
  rows: T[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  columns: ColumnDef<T, any>[];
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnsFilterChange?: (filter: ColumnFiltersState) => void;
  pageIndex?: number;
  pageSize?: number;
} & (
  | {
      handler?: "client";
    }
  | ({
      handler: "server";
      pageSize: number;
    } & ObjectWithPossibleOptionalKeys<{
      // pageCount will be a client (as in user of the hook) provided value, that means that it'll be 1 based instead of 0 based
      pageCount: number;
      rowCount: number;
    }>)
);

const getOnChangeValue = <T,>(updaterOrValue: Updater<T>, previousState: T) => {
  return typeof updaterOrValue === "function"
    ? (updaterOrValue as (old: T) => T)(previousState)
    : updaterOrValue;
};
const normalizePagination = (pagination: PaginationState) => {
  return {
    ...pagination,
    // due to the nature of the tanstack useReactTable hook, we need to move to a 0 base index instead of 1 base that we use to interface with the client
    pageIndex: pagination.pageIndex - 1,
  };
};

export const useDataTable = <T extends TableRow>({
  rows,
  columns,
  onPaginationChange,
  onSortingChange,
  onColumnsFilterChange,
  // 1 based indexing for the pagination interfacing
  pageIndex = 1,
  pageSize = 20,
  ...params
}: UseDataTableParams<T>) => {
  // this is a special implementation as it is not a direct interface with the tanstack useReactTable hook, it uses 1 based indexing
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const isServerSide = params.handler === "server";
  const pageCount = isServerSide
    ? params.pageCount !== undefined
      ? params.pageCount
      : // biome-ignore lint/style/noNonNullAssertion: if row count is undefined, row count will always be defined
        Math.ceil(params.rowCount! / pageSize)
    : Math.ceil(rows.length / pageSize);

  const table = useReactTable<T>({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerSide ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: isServerSide ? getSortedRowModel() : undefined,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: isServerSide,
    manualSorting: isServerSide,
    manualFiltering: isServerSide,
    onPaginationChange: (updaterOrValue) => {
      const value = getOnChangeValue(
        updaterOrValue,
        normalizePagination(pagination),
      );

      // when we interface with the onPaginationChange callback, we will need to move to a 1 base index instead of 0 base that tanstack uses
      const updatedPagination = { ...value, pageIndex: value.pageIndex + 1 };
      setPagination(updatedPagination);
      onPaginationChange?.(updatedPagination);
    },
    onColumnFiltersChange: (updaterOrValue) => {
      const updatedColFilters = getOnChangeValue(updaterOrValue, columnFilters);
      setColumnFilters(updatedColFilters);
      onColumnsFilterChange?.(updatedColFilters);
    },
    onSortingChange: (updaterOrValue) => {
      const updatedSorting = getOnChangeValue(updaterOrValue, sorting);
      setSorting(updatedSorting);
      onSortingChange?.(updatedSorting);
    },
    state: {
      pagination: normalizePagination(pagination),
      sorting,
      columnFilters,
    },
    ...params,
  });

  return {
    table,
    pagination: Object.assign(pagination, {
      canGoNextPage: table.getCanNextPage(),
      canGoPreviousPage: table.getCanPreviousPage(),
      goToNextPage: table.nextPage,
      goToPreviousPage: table.previousPage,
      goToFirstPage: table.firstPage,
      goToLastPage: table.lastPage,
      // accounting for the fact that our outside interface is 1 based
      goToPage: (pageIndex: number) => table.setPageIndex(pageIndex - 1),
      setPageSize: table.setPageSize,
      pageCount,
    }),
  };
};
