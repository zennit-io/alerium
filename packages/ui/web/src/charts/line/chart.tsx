"use client";

import { linearGradientDef } from "@nivo/core";
import {
  type Datum,
  type Point,
  ResponsiveLine,
  type LineProps as ResponsiveLineProps,
} from "@nivo/line";
import type { UniqueIdentifier } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { AnimatePresence } from "framer-motion";
import type {
  AreaConfig,
  CrosshairConfig,
  LegendConfig,
  PointConfig,
} from "../_types";
import type { ChartProps } from "../_types/chart-props";
import { buildConfig } from "../_utils/build-config";
import { buildGridConfig } from "../_utils/build-grid-config";
import { buildLegendProps } from "../_utils/build-legend-props";
import { buildMarginConfig } from "../_utils/build-margin-config";
import { buildThemeConfig } from "../_utils/build-theme-config";
import { LineChartPointTooltip, LineChartSliceTooltip } from "./tooltip";

// onPointClick doesn't work with sliceTooltip
export type LineChartProps = {
  data: { id: UniqueIdentifier; color?: string; data: Datum[] }[];
  pointLabelEnabled?: boolean;
  curve?: ResponsiveLineProps["curve"];
  area?: AreaConfig | boolean;
  point?: PointConfig | boolean;
  onPointClick?: (point: Point["data"]) => void;
} & ChartProps;

// todo: add chart handlers (onClick etc)

export const LineChart = ({
  data,
  className,
  pointLabelEnabled = false,
  point,
  area,
  indicator = "square",
  curve = "monotoneX",
  grid,
  crosshair = false,
  legend,
  tooltip = true,
  Indicator,
  onPointClick,
}: LineChartProps) => {
  const defaultCrosshairConfig: CrosshairConfig = {
    type: "x",
    style: "dashed",
    color: "hsl(var(--foreground))",
  };
  const crosshairConfig = buildConfig(crosshair, defaultCrosshairConfig);
  const isDefaultCrosshair =
    crosshairConfig?.type === "x" || crosshairConfig?.type === "y";

  const defaultPointConfig: PointConfig = {
    size: 6,
    color: "line-color",
  };

  const defaultLegendConfig: LegendConfig = { position: "bottom-right" };
  const legendConfig = buildConfig(legend, defaultLegendConfig);
  const pointConfig = buildConfig(point, defaultPointConfig);
  const areaConfig = buildConfig(area);

  const legendProps = buildLegendProps(indicator, legendConfig);
  const marginConfig = buildMarginConfig(legendConfig);
  const gridConfig = buildGridConfig(grid);
  const themeConfig = buildThemeConfig({ crosshairConfig, gridConfig });

  return (
    <AnimatePresence>
      <div className={cn("size-full", className)}>
        <ResponsiveLine
          data={data}
          margin={marginConfig}
          useMesh={!isDefaultCrosshair}
          curve={curve}
          enableGridX={gridConfig?.x}
          enableGridY={gridConfig?.y}
          enableSlices={
            isDefaultCrosshair ? (crosshairConfig.type as "x" | "y") : false
          }
          enablePoints={!!point}
          enableCrosshair={!!crosshair}
          enablePointLabel={pointLabelEnabled}
          lineWidth={2}
          pointSize={pointConfig?.size}
          pointColor={
            pointConfig?.color === "line-color"
              ? { from: "color" }
              : pointConfig?.color
          }
          colors={data.map((serie) => serie.color ?? "hsl(var(--primary))")}
          enableArea={!!areaConfig}
          areaOpacity={areaConfig?.opacity}
          animate
          crosshairType={crosshairConfig?.type}
          theme={themeConfig}
          legends={legendConfig ? [legendProps] : []}
          defs={[
            // using helpers
            // will inherit colors from a current element
            linearGradientDef("to-bottom", [
              { offset: 0, color: "inherit" },
              { offset: 100, color: "inherit", opacity: 0 },
            ]),
            linearGradientDef(
              "to-right",
              [
                { offset: 0, color: "inherit", opacity: 0 },
                { offset: 100, color: "inherit" },
              ],
              // You may specify transforms for your gradients, for example, rotations and skews,
              // following the transform attribute format.
              // For instance, here we rotate 90 degrees relative to the center of the object.
              {
                gradientTransform: "rotate(90 0.5 0.5)",
              },
            ),
          ]}
          // Defining rules to apply gradients
          fill={
            areaConfig?.gradientVariant !== undefined
              ? [{ match: "*", id: areaConfig.gradientVariant }]
              : []
          }
          sliceTooltip={(props) =>
            tooltip && (
              <LineChartSliceTooltip
                slice={props.slice}
                variant={indicator}
                Indicator={Indicator}
              />
            )
          }
          tooltip={({ point }) =>
            tooltip && (
              <LineChartPointTooltip
                slice={{ points: [point], id: "charts" }}
                variant={indicator}
                Indicator={Indicator}
              />
            )
          }
          onClick={({ data }) => onPointClick?.(data)}
        />
      </div>
    </AnimatePresence>
  );
};
