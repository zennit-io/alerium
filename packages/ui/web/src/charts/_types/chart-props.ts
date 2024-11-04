import type { Icon } from "@zenncore/types";
import type { ChartIndicator } from "./chart-indicator";
import type { CrosshairConfig } from "./crosshair-config";
import type { GridConfig } from "./grid-config";
import type { LegendConfig } from "./legend-config";

export type ChartProps = {
  className?: string;
  tooltip?: boolean;
  grid?: GridConfig | boolean;
  crosshair?: CrosshairConfig | boolean;
  legend?: LegendConfig | boolean;
  indicator?: ChartIndicator;
  Indicator?: Icon;
};
