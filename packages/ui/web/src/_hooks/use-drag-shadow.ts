import { animate, useMotionValue } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect } from "react";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

export const useDragShadow = (value: MotionValue<number>) => {
  const shadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isBeingDragged = false;

    return value.on("change", (updatedValue) => {
      const wasBeingDragged = isBeingDragged;

      if (updatedValue !== 0) {
        isBeingDragged = true;

        if (isBeingDragged !== wasBeingDragged) {
          animate(shadow, "5px 5px 10px rgba(0,0,0,0.3)");
        }
      } else {
        isBeingDragged = false;

        if (isBeingDragged !== wasBeingDragged) animate(shadow, inactiveShadow);
      }
    });
  }, [value, shadow]);

  return shadow;
};
