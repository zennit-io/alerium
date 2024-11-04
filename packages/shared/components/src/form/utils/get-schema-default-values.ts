import { z } from "zod";
import type { FormConfig, InferredFormFields, InferredSchema } from "../types";

export const getSchemaDefaultValues = <
  T extends FormConfig,
  S extends InferredSchema<T>,
>(
  schema: S,
): Partial<InferredFormFields<T>> => {
  const schemaDefaultValuesArray = Object.entries(schema.shape)
    .map(([key, value]) => {
      if (value instanceof z.ZodDefault) {
        return [key, value._def.defaultValue()];
      }
      return [key, undefined];
    })
    .filter(([, value]) => value !== undefined);

  return Object.fromEntries(schemaDefaultValuesArray);
};
