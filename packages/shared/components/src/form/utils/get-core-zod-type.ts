import { z } from "zod";
import type { CoreType } from "../types";

export const getCoreZodType = <T extends z.ZodType<unknown>>(
  type: T,
): CoreType<T> => {
  switch (true) {
    case type instanceof z.ZodOptional:
    case type instanceof z.ZodDefault:
      // @ts-ignore
      return getCoreZodType(type._def.innerType); //as any
    case type instanceof z.ZodEffects:
      return getCoreZodType(type._def.schema);
    case type instanceof z.ZodNullable:
      return getCoreZodType(type._def.innerType);
    default:
      return type as CoreType<T>;
  }
};
