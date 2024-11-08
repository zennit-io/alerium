import { useColorScheme } from "@zenncore/hooks/native";
import type { Tuple } from "@zenncore/types/utilities";
import { cn } from "@zenncore/utils";
import {
  LinearGradient as LinearGradientPrimitive,
  type LinearGradientProps as LinearGradientPrimitiveProps,
} from "expo-linear-gradient";

const getGradientStops = (
  {
    colorScheme,
    variant,
    inverted,
  }: Partial<{
    colorScheme: "dark" | "light" | "system";
    variant: "primary" | "default";
    inverted?: boolean;
  }> = {
    colorScheme: "system",
    variant: "default",
  },
): Tuple<string, 2> => {
  if (variant === "primary") {
    return inverted
      ? ["rgba(57,181,74,0)", "rgb(57,181,74)"]
      : ["rgba(57,181,74,1)", "rgba(57,181,74,0)"];
  }
  switch (colorScheme) {
    case "dark":
      return inverted
        ? ["rgba(25,25,25,0)", "rgba(25,25,25,1)"]
        : ["rgba(25,25,25,1)", "rgba(25,25,25,0)"];
    default: // light
      return inverted
        ? ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
        : ["rgba(255,255,255,1)", "rgba(255,255,255,0)"];
  }
};

type LinearGradientProps = {
  colors?: string[];
  variant?: "primary" | "default";
  inverted?: boolean;
} & Omit<LinearGradientPrimitiveProps, "colors">;
export const LinearGradient = ({
  colors: colorProp,
  variant,
  inverted,
  ...props
}: LinearGradientProps) => {
  const { colorScheme } = useColorScheme();

  const colors =
    colorProp ?? getGradientStops({ colorScheme, variant, inverted });

  return <LinearGradientPrimitive {...props} colors={colors} />;
};
