import type { IconProps } from "@zenncore/types/components";

export const SadIcon = (props: IconProps) => (
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
      d="M8 17C8.91212 15.7856 10.3643 15 12 15C13.6357 15 15.0879 15.7856 16 17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00897 9H8M16 9H15.991"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
