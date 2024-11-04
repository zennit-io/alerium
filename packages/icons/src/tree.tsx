import type { IconProps } from "@zenncore/types/components";

export const TreeIcon = (props: IconProps) => (
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
    <path d="M12 22V9" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M15 17.1973C16.7934 16.1599 18 14.2208 18 12C18 10.3744 17.3535 8.89971 16.3036 7.81915C16.4313 7.40197 16.5 6.95901 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 6.95901 7.56872 7.40197 7.69645 7.81915C6.64651 8.89971 6 10.3744 6 12C6 14.2208 7.2066 16.1599 9 17.1973"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 15L14.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13L9.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 22H14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
