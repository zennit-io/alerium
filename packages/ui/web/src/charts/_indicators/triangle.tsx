import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Triangle = ({ fill }: SymbolProps) => {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <title>Triangle</title>
      <path d="M9 0L17.6603 15H0.339746L9 0Z" fill={fill} />
    </svg>
  );
};
