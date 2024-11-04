import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Diamond = ({ fill }: SymbolProps) => {
  return (
    <svg width="12" height="14" viewBox="0 0 14 23" fill="none">
      <title>Diamond</title>
      <path d="M7 0L13.0622 11.25H0.937822L7 0Z" fill={fill} />
      <path d="M7 23L0.937822 11L13.0622 11L7 23Z" fill={fill} />
    </svg>
  );
};
