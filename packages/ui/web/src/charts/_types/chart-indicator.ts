import type { VariantProps } from "class-variance-authority";
import type { indicatorVariants } from "../_utils/indicator-variants";

export type ChartIndicator = NonNullable<
  VariantProps<typeof indicatorVariants>["variant"]
>;
