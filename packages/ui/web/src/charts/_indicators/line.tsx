import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Line = ({ fill }: SymbolProps) => {
  return (
    <svg width="5" height="14" viewBox="0 0 4 32" fill="none">
      <title>Line</title>
      <rect width="5" height="32" rx="2" fill={fill} />
    </svg>
  );
};
