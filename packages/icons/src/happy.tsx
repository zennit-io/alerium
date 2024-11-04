import type { IconProps } from "@zenncore/types/components";

export const HappyIcon = (props: IconProps) => (
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
    <circle
      cx="12"
      cy="12"
      r="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00897 9L8 9M16 9L15.991 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
