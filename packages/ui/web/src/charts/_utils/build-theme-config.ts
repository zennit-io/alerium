import type { Theme as ChartTheme } from "@nivo/core";
import type { CrosshairConfig, GridConfig } from "../_types";

type BuildThemeConfigParams = Partial<{
  gridConfig?: GridConfig;
  crosshairConfig?: CrosshairConfig;
}>;

export const buildThemeConfig = ({
  crosshairConfig,
  gridConfig,
}: BuildThemeConfigParams = {}): ChartTheme => ({
  text: {
    fontFamily: "var(--font-geist-sans)",
    fill: "hsl(var(--foreground))",
    fontWeight: "500",
  },
  crosshair: {
    line: {
      strokeDasharray: crosshairConfig?.style === "solid" ? "0" : "6",
      stroke: crosshairConfig?.color,
      strokeOpacity: crosshairConfig?.style === "hidden" ? 0 : 1,
      strokeWidth: crosshairConfig?.width,
    },
  },
  legends: {
    hidden: {
      symbol: {
        opacity: 20,
      },
    },
    text: {
      fontWeight: "400",
      fontSize: 13,
    },
    ticks: {
      line: {
        strokeWidth: 0,
      },
    },
  },
  axis: {
    ticks: {
      text: {
        fill: "hsl(var(--foreground-dimmed))",
      },
      line: {
        stroke: "hsl(var(--border))",
        strokeWidth: 0,
      },
    },
  },
  grid: {
    line: {
      stroke: gridConfig ? gridConfig.color : "transparent",
    },
  },
});
