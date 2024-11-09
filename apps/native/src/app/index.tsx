import { LinearGradient } from "@/components/general/linear-gradient";
import { Button } from "@zennui/native/button";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
} from "@zennui/native/carousel";
import { Text } from "@zennui/native/text";
import { H1, H3 } from "@zennui/native/typography";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

cssInterop(Image, { className: "style" });
cssInterop(ScrollView, { className: "style" });
cssInterop(SafeAreaView, { className: "style" });
cssInterop(LinearGradient, { className: "style" });

const ONBOARD_SECTIONS = [
  {
    image: require("@assets/images/onboard-1.png"),
    title: "Scan & Register Data",
    description:
      "Granlund & KONe App helps you register data fast by using enhanced AI",
  },
  {
    image: require("@assets/images/onboard-2.png"),
    title: "Keep track of maintanance",
    description:
      "Granlund & KONe App helps you register data fast by using enhanced AI",
  },
];

export default () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <View className="z-10 flex-1">
        <View className="gap-4">
          {/* <Carousel
            defaultActiveItem={2}
            itemCount={ONBOARD_SECTIONS.length}
            loop
          >
            <CarouselContent>
              {ONBOARD_SECTIONS.map((onboardSection, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <OnboardSection key={index} {...onboardSection} index={index} />
              ))}
            </CarouselContent>
            <CarouselIndicator growthIndex={5} />
          </Carousel> */}
        </View>
        <View
          className={"mt-auto gap-6 px-6"}
          style={{ paddingBottom: bottom + 20 }}
        >
          <Link href={"/sign-in"} asChild>
            <Button color={"primary"} variant={"soft"}>
              <Text
                className={"font-header text-foreground"}
                style={{ fontFamily: "RFDewiExtended-Bold" }}
              >
                Log in
              </Text>
            </Button>
          </Link>
          <Link href={"/register"} asChild>
            <Button color={"primary"}>
              <Text
                className={"font-header"}
                style={{ fontFamily: "RFDewiExtended-Bold" }}
              >
                Register your account
              </Text>
            </Button>
          </Link>

          <Link href={"/home"} asChild>
            <Text
              className={"-top-12 absolute self-center text-center text-2xl"}
            >
              Developer Gateway
            </Text>
          </Link>
        </View>

        <H3 className={"font-header font-normal text-3xl px-6"}>Maintenance</H3>
      </View>
      <LinearGradient
        colors={["rgba(255,89,0,0)", "rgba(255,89,0,0.6)"]}
        className="absolute bottom-0 h-40 w-full"
      />
    </>
  );
};

type OnboardSectionProps = {
  index: number;
} & (typeof ONBOARD_SECTIONS)[number];

const OnboardSection = ({
  index,
  image,
  title,
  description,
}: OnboardSectionProps) => {
  const { t } = useTranslation("", { keyPrefix: "onboard" });
  const titleTranslateX = useSharedValue(0);

  return (
    <CarouselItem
      key={index}
      index={index}
      className="w-screen"
      animate={(scrollOffset, index, itemSize) => {
        "worklet";
        const input = scrollOffset / itemSize;
        const inputRange = [index - 1, index, index + 1];

        const opacity = interpolate(
          input,
          inputRange,
          [0, 1, 0],
          Extrapolation.CLAMP,
        );

        titleTranslateX.value = interpolate(
          input,
          inputRange,
          [300, 0, -300],
          Extrapolation.CLAMP,
        );

        return {
          opacity,
        };
      }}
    >
      <Image source={image} className={"h-[55vh]"} />
      <Animated.View
        className="gap-2 px-6"
        style={{
          transform: [{ translateX: titleTranslateX }],
        }}
      >
        <H1
          style={{
            fontFamily: "RFDewiExtended-Bold",
          }}
          numberOfLines={2}
        >
          {t(title)}
        </H1>
        <Text className="text-lg" numberOfLines={3}>
          {t(description)}
        </Text>
      </Animated.View>
    </CarouselItem>
  );
};
