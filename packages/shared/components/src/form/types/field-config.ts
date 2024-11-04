import type { z } from "zod";
import type { FieldProps, FieldShape } from "./field-shape";

export type FieldConfig = {
  shape: FieldShape;
  constraint: z.ZodType;
  placeholder?: string;
  label?: string;
  description?: string;
} & FieldProps;

export type FormConfig = Record<string, FieldConfig>;

export type FieldValues = Record<string, unknown>;
