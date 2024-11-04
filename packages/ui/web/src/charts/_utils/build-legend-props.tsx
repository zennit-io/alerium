import type { LegendProps } from "@nivo/legends";
import type { LegendConfig } from "../_types";
import type { ChartIndicator } from "../_types/chart-indicator";
import { ChartLegendSymbol } from "../chart-legend-symbol";

export const buildLegendProps = (
  indicator: ChartIndicator,
  legendConfig?: LegendConfig,
) => {
  const isSideLegend = legendConfig?.position.includes("right");
  const isTopLegend = legendConfig?.position === "top";
  const legendProps = {
    anchor: legendConfig?.position ?? "right",
    direction: isSideLegend ? "column" : "row", //legend.direction ?? "column"
    justify: false,
    translateX: isSideLegend ? 130 : 0,
    translateY: isSideLegend ? 0 : isTopLegend ? -40 : 60,
    itemWidth: 120,
    itemHeight: ["pill", "diamond"].includes(indicator) ? 14 : 12,
    itemsSpacing: 8,
    symbolSize: ["line", "pill"].includes(indicator) ? 1 : 12,
    symbolShape: (props) => (
      <ChartLegendSymbol {...props} indicator={indicator} />
    ),
  } satisfies LegendProps;

  return legendProps;
};
