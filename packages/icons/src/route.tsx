import type { IconProps } from "@zenncore/types/components";

export const RouteIcon = (props: IconProps) => (
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
    <circle cx="18" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="19" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
