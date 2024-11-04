import type { LineProps as ResponsiveLineProps } from "@nivo/line";

export type CrosshairConfig = {
  type: ResponsiveLineProps["crosshairType"];
  style?: "solid" | "dashed" | "hidden";
  width?: number;
  color?: string;
};
