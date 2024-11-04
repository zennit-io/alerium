import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";
import { Circle } from "./_indicators/circle";
import { Diamond } from "./_indicators/diamond";
import { Line } from "./_indicators/line";
import { Pill } from "./_indicators/pill";
import { Square } from "./_indicators/square";
import { Triangle } from "./_indicators/triangle";
import type { ChartIndicator } from "./_types/chart-indicator";

export type ChartLegendSymbolProps = {
  indicator: ChartIndicator;
} & SymbolProps;

export const ChartLegendSymbol = ({
  indicator,
  ...props
}: ChartLegendSymbolProps) => {
  switch (indicator) {
    case "diamond":
      return <Diamond {...props} />;
    case "line":
      return <Line {...props} />;
    case "pill":
      return <Pill {...props} />;
    case "square":
      return <Square {...props} />;
    case "circle":
      return <Circle {...props} />;
    case "triangle":
      return <Triangle {...props} />;
    default:
      return <Square {...props} />;
  }
};
