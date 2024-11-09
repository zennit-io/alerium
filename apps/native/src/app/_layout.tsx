import {useFonts} from "expo-font";
import {useEffect} from "react";

import {Providers} from "@/components/providers/providers";
import {Text} from "@zennui/native/text";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "@zenncore/config/tailwind/globals";
import {LogBox} from "react-native";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

export default () => {
  const [isLoaded, error] = useFonts({
    "RFDewiExtended-Regular":
      require("@assets/fonts/rf-dewi/extended/RFDewiExtended-Regular.otf"),
    "RFDewiExtended-Bold":
      require("@assets/fonts/rf-dewi/extended/RFDewiExtended-Bold.otf"),
    "RFDewi-Black": require("@assets/fonts/rf-dewi/normal/RFDewi-Black.otf"),
    "RFDewi-Regular": require("@assets/fonts/rf-dewi/normal/RFDewi-Regular.otf"),
  });

  useEffect(() => {
    if (isLoaded || error) SplashScreen.hideAsync();
  }, [isLoaded, error]);

  if (!isLoaded) return null;

  if (error) return <Text>{error.message}</Text>;

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
        }}
      />
    </Providers>
  );
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
