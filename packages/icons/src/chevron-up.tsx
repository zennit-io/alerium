import type { IconProps } from "@zenncore/types/components";

export const ChevronUpIcon = (props: IconProps) => (
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
      d="M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
