import type { IconProps } from "@zenncore/types/components";

export const HelpIcon = (props: IconProps) => (
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
    <circle cx="12" cy="12" r="10" />
    <path
      d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
      strokeLinecap="round"
    />
    <path d="M11.992 17H12.001" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
