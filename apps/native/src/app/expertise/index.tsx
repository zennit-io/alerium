import { Header } from "@/components/general/header";
import { EditIcon, MapIcon, MicIcon } from "@zennui/icons";
import { Button } from "@zennui/native/button";
import { field } from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { H3 } from "@zennui/native/typography";
import { Link } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const config = {
  name: field({
    shape: "text",
    constraint: z.string().min(1),
    label: "Name Building",
    placeholder: "e.g Kone Building No.9",
    classList: {
      root: "gap-0",
      label: "text-2xl",
      input: {
        root: "border-0 gap-0",
        input: "placeholder:text-foreground-dimmed/50 text-xl h-auto",
      },
    },
  }),
};

export default () => {
  const { top } = useSafeAreaInsets();
  const size = useSharedValue(60);

  useEffect(() => {
    size.value = withRepeat(withTiming(90, { duration: 1000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      opacity: interpolate(size.value, [60, 80, 90], [1, 0.7, 0]),
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      width: interpolate(size.value, [60, 90], [60, 110]),
      height: interpolate(size.value, [60, 90], [60, 110]),
      opacity: interpolate(size.value, [60, 90], [1, 0]),
    };
  });

  return (
    <>
      <Header title="Add Expertise" />
      <View
        className="flex-1 px-6"
        style={{
          paddingTop: top + 60,
        }}
      >
        <Text className="text-2xl font-medium">The elevator is good</Text>
        <View className="gap-8 flex-1 pb-36">
          <View className="items-center justify-center mt-auto">
            <Animated.View
              style={animatedStyle}
              className="absolute bg-primary/10 rounded-full"
            />
            <Animated.View
              style={animatedStyle2}
              className="bg-primary/20 absolute rounded-full"
            />
            <View className="bg-primary/40 p-3 rounded-full border-primary/50 border">
              <MicIcon className="text-primary size-10" />
            </View>
          </View>
        </View>
        <Link href={"/details"} asChild>
          <Button
            color={"primary"}
            className="absolute self-center bottom-6 w-full"
          >
            <Text>Continue</Text>
          </Button>
        </Link>
      </View>
    </>
  );
};
