import type { IconProps } from "@zenncore/types/components";

export const MenuIcon = (props: IconProps) => (
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
    <path d="M4 5L16 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12L20 12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19L12 19" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
