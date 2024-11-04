import type { IconProps } from "@zenncore/types/components";

export const CamperIcon = (props: IconProps) => (
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
    <circle cx="17" cy="19" r="2" />
    <circle cx="7" cy="19" r="2" />
    <path
      d="M16 7H20.9383C21.4324 7 21.6794 7 21.8203 6.88531C21.9062 6.81539 21.9664 6.71959 21.9915 6.61269C22.0327 6.43736 21.9222 6.21984 21.7013 5.78486C21.1469 4.6935 20.8697 4.14783 20.438 3.76671C20.1688 3.529 19.8587 3.34036 19.5223 3.20962C18.9829 3 18.3631 3 17.1235 3H8.09555C5.22208 3 3.78535 3 2.89267 3.87868C2 4.75736 2 6.17157 2 9V14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 19H15M19 19C20.6569 19 22 17.6569 22 16V13H4C3.05719 13 2.58579 13 2.29289 13.2929C2 13.5858 2 14.0572 2 15V16C2 17.4142 2 18.1213 2.43934 18.5607C2.87868 19 3.58579 19 5 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 7L8 7" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M14 13V8.9657C14 8.25047 14 7.89285 14.123 7.62348C14.2146 7.42269 14.3522 7.25756 14.5196 7.14756C14.744 7 15.0421 7 15.6381 7C16.5393 7 16.9899 7 17.4041 7.14611C17.7159 7.25609 18.0108 7.42615 18.2772 7.64963C18.631 7.94652 18.9125 8.36875 19.4755 9.21321L22 13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
