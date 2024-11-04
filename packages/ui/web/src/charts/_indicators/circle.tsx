import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Circle = (props: SymbolProps) => {
  return (
    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
      <title>Circle</title>
      <circle cx="5" cy="5" r="5" fill={props.fill} />
    </svg>
  );
};
