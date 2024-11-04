import type { IconProps } from "@zenncore/types/components";

export const CheckIcon = (props: IconProps) => (
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
    <path
      d="M5 14L8.5 17.5L19 6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
