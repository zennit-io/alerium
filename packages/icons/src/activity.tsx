import type { IconProps } from "@zenncore/types/components";

export const ActivityIcon = (props: IconProps) => (
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
      d="M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12H8.5L10.5 8L13.5 16L15.5 12H18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
