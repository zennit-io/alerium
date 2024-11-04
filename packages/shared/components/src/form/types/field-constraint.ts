import type { z } from "zod";

type WrapperMap<T extends z.ZodType> = {
  optional: z.ZodOptional<T>;
  nullable: z.ZodNullable<T>;
  nullish: z.ZodOptional<z.ZodNullable<T>>;
  default: z.ZodDefault<T>;
  effect: z.ZodEffects<T>;
  pipe: z.ZodPipeline<T, z.ZodType>;
  readonly: z.ZodReadonly<T>;
};

type Wrapper = keyof WrapperMap<z.ZodType>;

type ApplyWrapper<T extends z.ZodType, W extends Wrapper> = WrapperMap<T>[W];

type CombinationsHelper<
  T extends z.ZodType,
  W extends Wrapper[],
  Depth extends number[] = [],
> = Depth["length"] extends 4
  ? T
  :
      | T
      | (W extends [
          infer First extends Wrapper,
          //@ts-ignore
          ...infer Rest extends Wrapper[],
        ]
          ? CombinationsHelper<ApplyWrapper<T, First>, W, [...Depth, 1]>
          : never);

/**
 *
 * FieldConstraint –
 * a type generic used to generate all possible type combinations for a given ZodPrimitive
 * (enum(string, number, boolean, ect))
 * this only facilities up to four transformations on the given ZodPrimitive, this is a TypeScript limitation.
 *
 * */

export type FieldConstraint<T extends z.ZodType> = CombinationsHelper<
  T,
  [Wrapper, Wrapper, Wrapper, Wrapper]
>;
