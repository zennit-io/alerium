import {ScannedInfoProvider} from "@/components/providers/scanned-info";
import {Stack} from "expo-router";

export default () => {
  return (
    <ScannedInfoProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
        }}
      />
    </ScannedInfoProvider>
  );
};
