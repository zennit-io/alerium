import type { Transition } from "framer-motion";

export const textAnimationVariants = {
  hidden: { opacity: 0, filter: "blur(3px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(3px)" },
};

type TextBlurAnimationConfig = {
  variants: typeof textAnimationVariants;
  initial: "hidden";
  animate: "visible";
  exit: "exit";
  transition: Transition;
};

export const textBlurAnimationConfig = {
  variants: textAnimationVariants,
  initial: "hidden",
  animate: "visible",
  exit: "exit",
  transition: {
    duration: 0.75,
    delay: 0.15,
  },
} satisfies TextBlurAnimationConfig;
