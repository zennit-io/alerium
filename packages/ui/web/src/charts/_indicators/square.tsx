import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Square = ({ fill }: SymbolProps) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <title>Square Icon</title>
      <rect width="12" height="12" rx="4" fill={fill} />
    </svg>
  );
};
