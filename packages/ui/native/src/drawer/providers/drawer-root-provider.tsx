import { type PropsWithChildren, createContext, useContext } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

type DrawerContextValue = SharedValue<number>;
const DrawerRootContext = createContext<DrawerContextValue | null>(null);

export const useDrawerRootContext = () => {
  const context = useContext(DrawerRootContext);

  if (!context) {
    throw new Error("Drawer should be used withing DrawerRootProvider");
  }
  return context;
};

export const DrawerRootProvider = ({ children }: PropsWithChildren) => {
  const scale = useSharedValue(1);

  return (
    <DrawerRootContext.Provider value={scale}>
      <View className={"flex-1 bg-black"}>
        <Animated.View
          style={{ transform: [{ scale }] }}
          className={"size-full overflow-hidden rounded-t-xl"}
        >
          {children}
        </Animated.View>
      </View>
    </DrawerRootContext.Provider>
  );
};
