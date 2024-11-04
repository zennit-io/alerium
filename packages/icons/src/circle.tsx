import type { IconProps } from "@zenncore/types/components";

export const CircleIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"currentColor"}
    fill={"none"}
    stroke={"currentColor"}
    strokeWidth={"1.5"}
    {...props}
  >
    <circle cx="12" cy="12" r="10" strokeLinejoin="round" />
  </svg>
);
