import type { Icon } from "@zenncore/types";
import type { VariantProps } from "class-variance-authority";
import type { indicatorVariants } from "../_utils/indicator-variants";

export type TooltipProps = VariantProps<typeof indicatorVariants> & {
  Indicator?: Icon;
};
