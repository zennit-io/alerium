import {
  type BarCommonProps,
  type ComputedDatum,
  ResponsiveBar,
} from "@nivo/bar";
import type { UniqueIdentifier } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { LegendConfig } from "../_types";
import type { ChartProps } from "../_types/chart-props";
import { buildConfig } from "../_utils/build-config";
import { buildGridConfig } from "../_utils/build-grid-config";
import { buildLegendProps } from "../_utils/build-legend-props";
import { buildMarginConfig } from "../_utils/build-margin-config";
import { buildThemeConfig } from "../_utils/build-theme-config";
import { BarItem } from "./bar";
import { BarChartTooltip } from "./tooltip";

type BarChartSerie = {
  id: UniqueIdentifier;
  color?: string;
  value: number;
};

export type FormattedBarSerie = {
  id: UniqueIdentifier;
  [key: string]: string | number;
};

type BarChartStackedSerie = {
  id: UniqueIdentifier;
  subSeries: BarChartSerie[];
};

type BarChartKey = {
  name: string;
  color?: string;
};

// type NormalBarChartData = {
//   type: "normal";
//   key: BarChartKey;
//   series: BarChartSerie[];
// };
//
// type StackedBarChartData = {
//   type: "stacked";
//   keys: BarChartKey[];
//   series: BarChartStackedSerie[];
// };

export type BarChartData =
  | {
      type: "normal";
      key: BarChartKey;
      series: BarChartSerie[];
    }
  | {
      type: "stacked";
      keys: BarChartKey[];
      stackedSeries: BarChartStackedSerie[];
    };

const formatBarChartData = (data: BarChartData) => {
  if (data.type === "stacked") {
    const { keys, stackedSeries } = data;

    return stackedSeries.map(({ subSeries, id }) => {
      return subSeries.reduce<FormattedBarSerie>(
        (accumulator, subSerie) => {
          const key = keys.find((key) => key.name === subSerie.id);

          return Object.assign(accumulator, {
            [subSerie.id]: subSerie.value,
            [`${subSerie.id}-color`]:
              subSerie?.color ?? key?.color ?? "hsl(var(--primary))",
          });
        },
        {
          id,
        },
      );
    });
  }

  const { key, series } = data;

  return series.map<FormattedBarSerie>((serie) => {
    return {
      id: serie.id,
      [serie.id]: serie.value,
      [`${serie.id}-color`]: serie.color ?? key.color ?? "hsl(var(--primary))",
    };
  });
};

const getBarChartKeys = (data: BarChartData): string[] => {
  if ("key" in data) return data.series.map((serie) => serie.id.toString());
  return data.keys.map((key) => key.name);
};

const getChartColors = (data: BarChartData) => {
  if ("key" in data) {
    return data.series.map(
      (serie) => serie.color ?? data.key.color ?? "hsl(var(--primary))",
    );
  }

  return data.keys.map((key) => key.color ?? "hsl(var(--primary))");
};

type BarChartProps = {
  data: BarChartData;
  layout?: BarCommonProps<unknown>["layout"];
  mode?: BarCommonProps<unknown>["groupMode"];
  showBarTotalValue?: boolean;
  onSerieClick?: (
    data: ComputedDatum<FormattedBarSerie> & { color: string },
  ) => void;
} & ChartProps;

export const BarChart = ({
  data,
  legend,
  indicator = "square",
  className,
  tooltip = true,
  Indicator,
  grid,
  layout = "vertical",
  mode = "stacked",
  showBarTotalValue,
  onSerieClick,
}: BarChartProps) => {
  const defaultLegendConfig: LegendConfig = { position: "bottom" };
  const legendConfig = buildConfig(legend, defaultLegendConfig);

  const legendProps = buildLegendProps(indicator, legendConfig);
  const chartMargin = buildMarginConfig(legendConfig);
  const gridConfig = buildGridConfig(grid);
  const themeConfig = buildThemeConfig({ gridConfig });

  return (
    <div className={cn("size-full", className)}>
      <ResponsiveBar
        barComponent={BarItem}
        borderRadius={4}
        data={formatBarChartData(data)}
        keys={getBarChartKeys(data)}
        indexBy={"id"}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        axisTop={null}
        axisRight={null}
        layout={layout}
        groupMode={mode}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        margin={chartMargin}
        enableTotals={showBarTotalValue}
        colors={getChartColors(data)}
        enableGridX={gridConfig?.x}
        enableGridY={gridConfig?.y}
        theme={themeConfig}
        tooltip={(props) =>
          tooltip && (
            <BarChartTooltip
              {...props}
              id={"key" in data ? data.key.name : props.id}
              variant={indicator}
              Indicator={Indicator}
            />
          )
        }
        legends={
          legendConfig
            ? [
                {
                  dataFrom: "keys",
                  ...legendProps,
                },
              ]
            : []
        }
        onClick={(data) => onSerieClick?.(data)}
      />
    </div>
  );
};
