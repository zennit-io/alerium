import type { IconProps } from "@zenncore/types/components";

export const TimerIcon = (props: IconProps) => (
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
      d="M18 5.5L19 4.5M5 4.5L6 5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="13" r="9" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M12 9.5V13.5L14 15.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 3.5V2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 2H14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
