"use client";

import type { DatumValue } from "@nivo/core";
import type { Point } from "@nivo/line";
import { motion } from "framer-motion";
import { textBlurAnimationConfig } from "../../_animations/text-blur";
import type { TooltipProps } from "../_types/tooltip-props";
import { indicatorVariants } from "../_utils/indicator-variants";

export type LineChartTooltipProps = {
  slice: { points: readonly Point[]; id: DatumValue };
} & TooltipProps;

export const LineChartSliceTooltip = ({
  slice: { points, id },
  variant = "square",
  Indicator,
}: LineChartTooltipProps) => {
  return (
    <div
      className={
        "flex flex-col gap-1 rounded-lg border border-border bg-background p-2"
      }
    >
      <motion.span
        key={`tooltip-${id}`}
        className={"font-semibold"}
        {...textBlurAnimationConfig}
      >
        {points[0]?.data.xFormatted}
      </motion.span>
      <hr className={"h-px w-full border-border"} />
      {points.map(({ data: { yFormatted }, index, serieColor, serieId }) => (
        <div key={index} className={"flex items-center gap-1"}>
          {Indicator ? (
            <Indicator className={"size-1.5 min-h-1.5 min-w-1.5"} />
          ) : (
            <span
              data-color={serieColor}
              style={{
                backgroundColor: serieColor,
                borderBottomColor: serieColor,
              }}
              className={indicatorVariants({ variant })}
            />
          )}

          <div className={"flex w-full items-center justify-between gap-8"}>
            <span className={"text-foreground-dimmed text-sm"}>{serieId}</span>
            <motion.span
              className={"font-mono text-sm"}
              {...textBlurAnimationConfig}
            >
              {yFormatted}
            </motion.span>
          </div>
        </div>
      ))}
    </div>
  );
};
const containerAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 100,
  },
  exit: {
    opacity: 0,
  },
};
export const LineChartPointTooltip = (props: LineChartTooltipProps) => {
  return (
    <motion.div
      variants={containerAnimationVariants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <LineChartSliceTooltip {...props} />
    </motion.div>
  );
};
