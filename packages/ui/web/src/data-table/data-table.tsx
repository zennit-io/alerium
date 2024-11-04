"use client";

import { flexRender } from "@tanstack/react-table";
import {
  DataTableProvider,
  type DataTableProviderProps,
  type TableRow as TableRowType,
  useDataTableContext,
} from "@zenncore/components/data-table";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

type DataTableSector = "row" | "cell" | "footer" | "table";
type DataTablePosition = "header" | "body" | "footer";
type DataTableClassListKey =
  | `${DataTablePosition}-${DataTableSector}`
  | "table";
type DataTablePrimitiveProps = {
  className?: string;
  classList?: ClassList<DataTableClassListKey>;
};

const DataTablePrimitive = ({
  className,
  classList,
}: DataTablePrimitiveProps) => {
  const { table } = useDataTableContext();
  const rows = table.getRowModel().rows;

  return (
    <Table className={cn(className, classList?.table)}>
      <TableHeader className={classList?.["header-table"]}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className={classList?.["header-row"]}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={classList?.["header-cell"]}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className={classList?.["body-table"]}>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={classList?.["body-row"]}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={classList?.["body-cell"]}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className={classList?.["body-row"]}>
            <TableCell
              colSpan={table.getAllColumns().length}
              className={cn("h-24 text-center", classList?.["body-cell"])}
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export type DataTableProps<T extends TableRowType> = {
  rows: T[];
} & DataTableProviderProps<T> &
  DataTablePrimitiveProps;

export const DataTable = <T extends TableRowType>({
  children,
  className,
  classList,
  ...props
}: DataTableProps<T>) => {
  return (
    <DataTableProvider {...props}>
      <DataTablePrimitive className={className} classList={classList} />
      {children}
    </DataTableProvider>
  );
};
