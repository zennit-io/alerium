import type { RowData } from "@tanstack/react-table";
import type { AdditionalTableRowProperties } from "./additional-table-row-properties";

export type TableRow = AdditionalTableRowProperties & RowData;
