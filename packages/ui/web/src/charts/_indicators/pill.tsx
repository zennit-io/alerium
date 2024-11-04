import type { SymbolProps } from "@nivo/legends/dist/types/svg/symbols/types";

export const Pill = ({ fill }: SymbolProps) => {
  return (
    <svg width="5" height="14" viewBox="0 0 4 20" fill="none">
      <title>Pill</title>
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0V0C3.10457 0 4 0.895431 4 2V4H0V2Z"
        fill={fill}
      />
      <path
        d="M4 18C4 19.1046 3.10457 20 2 20V20C0.895431 20 7.8281e-08 19.1046 1.74846e-07 18L3.49691e-07 16L4 16L4 18Z"
        fill={fill}
      />
      <path d="M4 14L-4.76837e-07 14L2.22545e-07 6L4 6L4 14Z" fill={fill} />
    </svg>
  );
};
