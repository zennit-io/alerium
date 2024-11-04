import type { BarDatum, BarItemProps } from "@nivo/bar/dist/types/types";
import { useTheme } from "@nivo/core";
import { useTooltip } from "@nivo/tooltip";
import { type SpringValue, animated, to } from "@react-spring/web";
import { type MouseEvent, createElement, useCallback } from "react";

type BarChartSerie = {
  id: string;
  data: { value: number };
};

const getIsTopSerie = <RawDatum extends BarDatum>(data: BarChartSerie) => {
  const target = data.id;
  const series = { ...data.data };
  const shape: Record<
    string,
    | string
    | number
    | boolean
    | Exclude<RawDatum, false | "" | 0 | null | undefined>
    | null
    | undefined
  > = {};
  Object.keys(series).map((key) => {
    if (!(key.includes("-color") || key === "id"))
      shape[key] = series[key as keyof typeof series];
  });
  const newKeys = Object.keys(shape);
  return newKeys[newKeys.length - 1] === target;
};
function getRoundedTopPath(
  width: SpringValue<number>,
  height: SpringValue<number>,
  radius: number,
) {
  return to(
    [width, height],
    (w, h) =>
      `M${radius} 0
     H${w - radius}
     Q${w} 0 ${w} ${radius}
     V${h}
     H0
     V${radius}
     Q0 0 ${radius} 0`,
  );
}
export const BarItem = <RawDatum extends BarDatum>({
  bar: { data, ...bar },
  style: {
    borderColor,
    color,
    height,
    labelColor,
    labelOpacity,
    labelX,
    labelY,
    transform,
    width,
  },
  borderRadius,
  borderWidth,
  label,
  shouldRenderLabel,
  isInteractive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip,
  isFocusable,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: BarItemProps<RawDatum>) => {
  const theme = useTheme();
  const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip();
  const renderTooltip = createElement(tooltip, { ...bar, ...data });

  const handleClick = (event: MouseEvent<SVGRectElement>) => {
    onClick?.({ color: bar.color, ...data }, event);
  };
  const handleTooltip = useCallback(
    (event: MouseEvent<SVGRectElement>) =>
      showTooltipFromEvent(renderTooltip, event),
    [showTooltipFromEvent, renderTooltip],
  );
  const handleMouseEnter = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseEnter?.(data, event);
      showTooltipFromEvent(renderTooltip, event);
    },
    [data, onMouseEnter, showTooltipFromEvent, renderTooltip],
  );
  const handleMouseLeave = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseLeave?.(data, event);
      hideTooltip();
    },
    [data, hideTooltip, onMouseLeave],
  );

  showTooltipAt(renderTooltip, [bar.absX + bar.width / 2, bar.absY]);

  const handleBlur = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  const isTopSerie = getIsTopSerie(data as unknown as BarChartSerie);

  return (
    <animated.g
      transform={transform}
      style={isTopSerie ? { position: "relative", zIndex: -100 } : undefined}
    >
      <animated.path
        d={getRoundedTopPath(width, height, isTopSerie ? borderRadius : 0)}
        fill={data.fill ?? color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        focusable={isFocusable}
        tabIndex={isFocusable ? 0 : undefined}
        aria-label={ariaLabel ? ariaLabel(data) : undefined}
        aria-labelledby={ariaLabelledBy ? ariaLabelledBy(data) : undefined}
        aria-describedby={ariaDescribedBy ? ariaDescribedBy(data) : undefined}
        onMouseEnter={isInteractive ? handleMouseEnter : undefined}
        onMouseMove={isInteractive ? handleTooltip : undefined}
        onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        onClick={isInteractive ? handleClick : undefined}
        onBlur={isInteractive && isFocusable ? handleBlur : undefined}
      />

      {shouldRenderLabel && (
        <animated.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fillOpacity={labelOpacity}
          style={{
            ...theme.labels.text,
            pointerEvents: "none",
            fill: labelColor,
          }}
        >
          {label}
        </animated.text>
      )}
    </animated.g>
  );
};
