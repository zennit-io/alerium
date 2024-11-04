import type { IconProps } from "@zenncore/types/components";

export const ClockIcon = (props: IconProps) => (
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
      d="M18.952 8.60639L21.4621 8.45358C19.6628 3.70459 14.497 0.999731 9.46037 2.34456C4.09595 3.77692 0.909592 9.26089 2.34343 14.5933C3.77728 19.9258 9.28835 23.0874 14.6528 21.6551C18.6358 20.5916 21.418 17.2945 22 13.4842"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.99982V11.9998L14 13.9998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
