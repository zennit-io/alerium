"use client";

import {
  type AccessorFn,
  type ColumnDef,
  type Row,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import {
  type AdditionalTableRowProperties,
  DataTableProvider,
  type DataTableProviderProps,
  useDataTableContext,
} from "@zenncore/components/data-table";
import type {
  FieldConfig,
  FieldShape,
  InferredFormFields,
} from "@zenncore/components/form";
import { useAutoSave } from "@zenncore/hooks";
import { cn } from "@zenncore/utils";
import { Fragment, type ReactNode, useCallback } from "react";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  type InferredFieldConfig,
  InferredFormField,
  useFormField,
  useInferredForm,
} from "../form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Tooltip } from "../tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

export type InferredRowData<T extends EditableDataConfig> = {
  [key in keyof T]: z.infer<T[key]["constraint"]>;
} & AdditionalTableRowProperties;

export const column = <S extends FieldShape, T extends z.ZodType>(
  field: InferredFieldConfig<S, T> & CellAdditionalProperties,
) => field;

export type CellAdditionalProperties = {
  className?: string;
  isHidden?: boolean;
  isReadOnly?: boolean;
};
export type InferredEditableDataCellConfig<
  S extends FieldShape,
  T extends z.ZodType,
> = InferredFieldConfig<S, T> & CellAdditionalProperties;

export type GeneralEditableDataCellConfig = FieldConfig &
  CellAdditionalProperties;

export type EditableDataConfig = { id: GeneralEditableDataCellConfig } & Record<
  string,
  GeneralEditableDataCellConfig
>;

type EditableDataTablePrimitiveProps<T extends EditableDataConfig> = {
  config: T;
};
export type EditableDataTableProps<T extends EditableDataConfig> =
  EditableDataTablePrimitiveProps<T> &
    Omit<DataTableProviderProps<InferredRowData<T>>, "columns">;

const EditableDataTablePrimitive = <T extends EditableDataConfig>({
  config,
}: EditableDataTablePrimitiveProps<T>) => {
  type RowData = InferredRowData<T>;
  const { table } = useDataTableContext<RowData>();

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  colSpan={header.colSpan}
                  key={header.id}
                  data-colname={header.id}
                  className={
                    "w-fit border-border border-x first:border-l-transparent last:border-r-transparent"
                  }
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
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <EditableDataTableRow
              row={row}
              config={config}
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={
                    "border-border border-x p-0 first:border-l-transparent last:border-r-transparent"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </EditableDataTableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const EditableDataTable = <T extends EditableDataConfig>({
  config,
  children,
  ...props
}: EditableDataTableProps<T>) => {
  const columns = buildColumnMap<T>(config);

  return (
    <DataTableProvider {...props} columns={columns} handler={"client"}>
      <EditableDataTablePrimitive config={config} />
      {children}
    </DataTableProvider>
  );
};
const buildColumnMap = <T extends EditableDataConfig>(
  config: T,
): ColumnDef<InferredRowData<T>>[] => {
  type RowData = InferredRowData<T>;
  const createColumn = createColumnHelper<RowData>();

  return Object.entries(config).map(([key, { className, ...props }]) =>
    createColumn.accessor(key as unknown as AccessorFn<InferredRowData<T>>, {
      header: props.label ?? key,
      // todo: make it so it only focuses on double click of the cell
      cell: () => (
        <Tooltip delayDuration={100}>
          <FormField
            name={key}
            render={({ field }) => (
              <Fragment>
                <TooltipTrigger className={"w-full"} asChild>
                  <FormItem>
                    <div
                      className={cn(
                        "flex flex-col gap-2",
                        ["switch", "checkbox"].includes(props.shape) &&
                          "flex-row items-center",
                      )}
                    >
                      <FormControl>
                        <InferredFormField
                          {...props}
                          {...field}
                          className={cn(
                            "h-14 rounded-none border-transparent px-4 focus-within:bg-primary/20 has-[[aria-invalid=true]]:bg-error/20",
                            className,
                          )}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                </TooltipTrigger>
                <FormErrorTooltip />
              </Fragment>
            )}
          />
        </Tooltip>
      ),
    }),
  );
};

export const FormErrorTooltip = () => {
  const { error } = useFormField();
  console.log(error);
  return (
    error?.message && (
      <TooltipContent className={"text-error"}>
        {error.message?.toString()}
      </TooltipContent>
    )
  );
};

type EditableDataTableRowProps<T extends EditableDataConfig> = {
  config: T;
  row: Row<InferredRowData<T>>;
  children: ReactNode;
};
const EditableDataTableRow = <T extends EditableDataConfig>({
  config,
  row,
  children,
}: EditableDataTableRowProps<T>) => {
  const form = useInferredForm(config, {
    defaultValues: row.original,
    props: {
      mode: "onChange",
    },
  });
  const onSubmit = useCallback(async (data: InferredFormFields<T>) => {
    console.log(data);
  }, []);

  useAutoSave(form, onSubmit);

  return (
    <TooltipProvider>
      <TableRow>
        <Form {...form}>{children}</Form>
      </TableRow>
    </TooltipProvider>
  );
};
