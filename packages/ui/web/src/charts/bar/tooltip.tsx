"use client";

import type { BarTooltipProps } from "@nivo/bar/dist/types/types";
import { motion } from "framer-motion";
import { textBlurAnimationConfig } from "../../_animations/text-blur";
import type { TooltipProps } from "../_types/tooltip-props";
import { indicatorVariants } from "../_utils/indicator-variants";
import type { FormattedBarSerie } from "./chart";

export type BarChartTooltipProps = BarTooltipProps<FormattedBarSerie> &
  TooltipProps;

export const BarChartTooltip = ({
  id,
  value,
  index,
  indexValue,
  Indicator,
  color,
  variant = "square",
}: BarChartTooltipProps) => {
  return (
    <div
      className={
        "flex flex-col gap-1 rounded-lg border border-border bg-background p-2"
      }
    >
      <span key={`tooltip-${index}`} className={"font-semibold"}>
        {indexValue}
      </span>
      <hr className={"h-px w-full border-border"} />
      <div className={"flex w-full items-center justify-between gap-8"}>
        <span className={"flex items-center gap-1"}>
          <div key={index} className={"flex items-center gap-1"}>
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
          </div>
          <motion.span
            key={`tooltip-${id}`}
            className={"text-foreground-dimmed text-xs"}
            {...textBlurAnimationConfig}
          >
            {id}
          </motion.span>
        </span>
        <motion.span
          key={`tooltip-${id}`}
          className={"font-mono text-sm"}
          {...textBlurAnimationConfig}
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
};
