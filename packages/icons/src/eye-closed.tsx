import type { IconProps } from "@zenncore/types/components";

export const EyeClosedIcon = (props: IconProps) => (
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
    <path d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8" strokeLinecap="round" />
    <path d="M15 13.5L16.5 16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 11L22 13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 13L4 11" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13.5L7.5 16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
