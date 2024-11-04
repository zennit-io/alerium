import type { IconProps } from "@zenncore/types/components";

export const SearchIcon = (props: IconProps) => (
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
    <path d="M17.5 17.5L22 22" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
      strokeLinejoin="round"
    />
  </svg>
);
