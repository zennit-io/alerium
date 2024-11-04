import { THEME_COLORS } from "@/lib/constants";
import type { Theme } from "@react-navigation/native";
import { ThemeProvider as ThemeProviderPrimitive } from "@react-navigation/native";
import { useAsyncStorage, useColorScheme } from "@zenncore/hooks/native";
import { SplashScreen } from "expo-router";
import { type PropsWithChildren, useEffect, useState } from "react";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: THEME_COLORS.light,
  fonts: {
    regular: {
      fontFamily: "RFDewi-Regular",
      fontWeight: "500",
    },
    medium: {
      fontFamily: "RFDewiExtended-Bold",
      fontWeight: "700",
    },
    bold: {
      fontFamily: "RFDewiExtended-Bold",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "RFDewi-Black",
      fontWeight: "900",
    },
  },
};
const DARK_THEME: Theme = {
  dark: true,
  colors: THEME_COLORS.dark,
  fonts: {
    regular: {
      fontFamily: "RFDewi-Regular",
      fontWeight: "500",
    },
    medium: {
      fontFamily: "RFDewiExtended-Bold",
      fontWeight: "700",
    },
    bold: {
      fontFamily: "RFDewiExtended-Bold",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "RFDewi-Black",
      fontWeight: "900",
    },
  },
};
// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme, isDarkColorScheme, toggleColorScheme } =
    useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const [savedTheme, setSavedTheme] = useAsyncStorage("theme", colorScheme);
  useEffect(() => {
    (async () => {
      if (!savedTheme) {
        await setSavedTheme(colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      if (colorScheme !== savedTheme) {
        await setSavedTheme(colorScheme);
        setColorScheme(colorScheme);
      }
      setIsColorSchemeLoaded(true);
    })();
  }, [colorScheme, setColorScheme, savedTheme, setSavedTheme]);

  if (!isColorSchemeLoaded) return null;

  return (
    <ThemeProviderPrimitive
      value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}
    >
      {children}
    </ThemeProviderPrimitive>
  );
};
