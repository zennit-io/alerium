import type { IconProps } from "@zenncore/types/components";

export const ChevronsLeftIcon = (props: IconProps) => (
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
      d="M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
