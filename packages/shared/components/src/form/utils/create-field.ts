import type { z } from "zod";
import type {
  FieldShape,
  FieldShapePropsMap,
  InferredFieldConfig,
} from "../types";

export const field = <
  M extends FieldShapePropsMap,
  S extends FieldShape,
  T extends z.ZodType,
>(
  field: InferredFieldConfig<M, S, T>,
) => field;
