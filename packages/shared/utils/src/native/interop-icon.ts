import type { Icon } from "@zenncore/types/components";
import { cssInterop } from "nativewind";

export const interopIcon = (icon: Icon) => {
  return cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
        width: true,
        height: true,
        transform: true,
      },
    },
  });
};
