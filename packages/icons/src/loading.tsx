import type { IconProps } from "@zenncore/types/components";

export const LoadingIcon = (props: IconProps) => (
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
    <path d="M12 3V6" strokeLinecap="round" />
    <path d="M12 18V21" strokeLinecap="round" />
    <path d="M21 12L18 12" strokeLinecap="round" />
    <path d="M6 12L3 12" strokeLinecap="round" />
    <path d="M18.3635 5.63672L16.2422 7.75804" strokeLinecap="round" />
    <path d="M7.75804 16.2422L5.63672 18.3635" strokeLinecap="round" />
    <path d="M18.3635 18.3635L16.2422 16.2422" strokeLinecap="round" />
    <path d="M7.75804 7.75804L5.63672 5.63672" strokeLinecap="round" />
  </svg>
);
