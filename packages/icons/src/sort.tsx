import type { IconProps } from "@zenncore/types/components";

export const SortIcon = (props: IconProps) => (
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
    <path d="M11 10L18 10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 14H16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 18H14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 6H21" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M7 18.8125C6.60678 19.255 5.56018 21 5 21M3 18.8125C3.39322 19.255 4.43982 21 5 21M5 21L5 15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 5.1875C3.39322 4.74501 4.43982 3 5 3M7 5.1875C6.60678 4.74501 5.56018 3 5 3M5 3L5 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
