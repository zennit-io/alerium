import type { IconProps } from "@zenncore/types/components";

export const BookIcon = (props: IconProps) => (
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
      d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5"
      strokeLinecap="round"
    />
    <path
      d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5"
      strokeLinecap="round"
    />
    <path
      d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17"
      strokeLinecap="round"
    />
    <path d="M15 7L9 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11L9 11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
