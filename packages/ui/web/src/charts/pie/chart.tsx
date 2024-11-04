import { ResponsivePie } from "@nivo/pie";
import type { UniqueIdentifier } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { AnimatePresence } from "framer-motion";
import type { LegendConfig } from "../_types";
import type { ChartProps } from "../_types/chart-props";
import { buildConfig } from "../_utils/build-config";
import { buildLegendProps } from "../_utils/build-legend-props";
import { buildMarginConfig } from "../_utils/build-margin-config";
import { buildThemeConfig } from "../_utils/build-theme-config";
import { PieChartTooltip } from "./tooltip";

export type PieChartData = {
  id: UniqueIdentifier;
  value: number;
  color?: string;
  label?: string;
};

export type PieChartProps<T extends PieChartData[]> = {
  data: Readonly<T>;
  sliceLabelEnabled?: boolean;
  sliceLinkLabelEnabled?: boolean;
  sortByValue?: boolean;
  activeSliceId?: UniqueIdentifier;
  onSliceClick?: (data: PieChartData) => void;
  onActiveSliceChange?: (activeSliceId: UniqueIdentifier | null) => void;
} & ChartProps;

export const PieChart = <T extends PieChartData[]>({
  data,
  indicator = "square",
  legend,
  activeSliceId,
  sliceLabelEnabled,
  sliceLinkLabelEnabled,
  sortByValue,
  className,
  onSliceClick,
  onActiveSliceChange,
}: PieChartProps<T>) => {
  const defaultLegendConfig: LegendConfig = { position: "bottom" };
  const legendConfig = buildConfig(legend, defaultLegendConfig);

  const legendProps = buildLegendProps(indicator, legendConfig);
  const marginConfig = buildMarginConfig(legendConfig);
  const themeConfig = buildThemeConfig();

  return (
    <AnimatePresence>
      <div className={cn("size-full", className)}>
        <ResponsivePie
          data={data}
          margin={marginConfig}
          colors={data.map((serie) => serie.color ?? "hsl(var(--primary))")}
          innerRadius={0.5}
          activeId={activeSliceId}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLabels={sliceLabelEnabled}
          enableArcLinkLabels={sliceLinkLabelEnabled}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          sortByValue={sortByValue}
          tooltip={({ datum }) => (
            <PieChartTooltip datum={datum} variant={indicator} />
          )}
          theme={themeConfig}
          legends={
            legendConfig
              ? [
                  {
                    ...legendProps,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "hsl(var(--primary))",
                        },
                      },
                    ],
                  },
                ]
              : []
          }
          onClick={({ data }) => onSliceClick?.(data)}
          onActiveIdChange={(activeId) => onActiveSliceChange?.(activeId)}
        />
      </div>
    </AnimatePresence>
  );
};
