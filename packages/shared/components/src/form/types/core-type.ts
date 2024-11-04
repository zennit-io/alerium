import type { z } from "zod";

// explanation for the biome-ignore comment
// U needs to be redeclared, so we can recall it inside CoreType as a recursive type

// export type CoreType<T> = T extends
//   | z.ZodDefault<infer U>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodOptional<infer U>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodNullable<infer U>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.Effect<infer U>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodEffects<infer U>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodUnion<[infer U, ...Array<z.ZodType>]>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodIntersection<infer U, z.ZodType>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodPipeline<infer U, z.ZodType>
//   // biome-ignore lint/suspicious/noRedeclare: <above>
//   | z.ZodReadonly<infer U>
//   ? CoreType<U>
//   : T;

export type CoreType<T> = T extends z.ZodDefault<infer U>
  ? CoreType<U>
  : T extends z.ZodOptional<infer U>
    ? CoreType<U>
    : T extends z.ZodNullable<infer U>
      ? CoreType<U>
      : T extends z.Effect<infer U>
        ? CoreType<U>
        : T extends z.ZodEffects<infer U>
          ? CoreType<U>
          : // T extends z.ZodUnion<[infer U, ...Array<z.ZodType>]> ? CoreType<U> :
            T extends z.ZodIntersection<infer U, z.ZodType>
            ? CoreType<U>
            : T extends z.ZodPipeline<infer U, z.ZodType>
              ? CoreType<U>
              : T extends z.ZodReadonly<infer U>
                ? CoreType<U>
                : T;
