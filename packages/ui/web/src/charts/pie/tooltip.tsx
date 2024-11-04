import type { ComputedDatum } from "@nivo/pie";
import { motion } from "framer-motion";
import type { TooltipProps } from "../_types/tooltip-props";
import { indicatorVariants } from "../_utils/indicator-variants";

import { textBlurAnimationConfig } from "../../_animations/text-blur";
import type { PieChartData } from "./chart";

export type PieChartTooltipProps = {
  datum: ComputedDatum<PieChartData>;
} & TooltipProps;

export const PieChartTooltip = ({
  datum: { id, value, label, color },
  variant = "square",
  Indicator,
}: PieChartTooltipProps) => {
  return (
    <div
      key={id}
      className={
        "flex items-center gap-1 rounded-lg border border-border bg-accent p-2"
      }
    >
      {Indicator ? (
        <Indicator className={"size-1.5 min-h-1.5 min-w-1.5"} />
      ) : (
        <span
          data-color={color}
          style={{
            backgroundColor: color,
            borderBottomColor: color,
          }}
          className={indicatorVariants({ variant })}
        />
      )}

      <div className={"flex w-full items-center justify-between gap-8"}>
        <motion.span
          key={`tooltip-name-${id}`}
          className={"text-foreground-dimmed text-sm"}
          {...textBlurAnimationConfig}
        >
          {label ?? id}
        </motion.span>
        <motion.span
          key={`tooltip-value-${id}`}
          className={"font-mono text-sm"}
          {...textBlurAnimationConfig}
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
};
