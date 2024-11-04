import type { Margin } from "@nivo/core";
import type { LegendConfig } from "../_types";

export const buildMarginConfig = (legendConfig?: LegendConfig): Margin => {
  const isSideLegend = legendConfig?.position.includes("right");
  const isTopLegend = legendConfig?.position === "top";

  return {
    bottom: legendConfig?.position === "bottom" ? 60 : 30,
    left: 30,
    right: isSideLegend ? 20 + 110 : 20,
    top: isTopLegend ? 60 : 20,
  };
};
