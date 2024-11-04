import { cn } from "@zenncore/utils";
import { type ElementRef, createContext, forwardRef, useContext } from "react";
import { Text as PrimitiveText } from "react-native";
import {
  Text as SlottableText,
  type TextProps as SlottableTextProps,
} from "./slot";

export const TextClassContext = createContext<string | undefined>(undefined);

export type TextProps = SlottableTextProps & {
  asChild?: boolean;
};

export const Text = forwardRef<ElementRef<typeof SlottableText>, TextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = useContext(TextClassContext);
    const Component = asChild ? SlottableText : PrimitiveText;

    return (
      <Component
        // allowFontScaling={false}
        maxFontSizeMultiplier={1.2}
        className={cn("text-base text-foreground", textClass, className)}
        {...props}
      />
    );
  },
);
