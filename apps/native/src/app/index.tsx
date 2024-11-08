import { LinearGradient } from "@/components/general/linear-gradient";
import { LayoutButton } from "@/components/home/layout-button";
import { Button } from "@zennui/native/button";
import { CarouselItem } from "@zennui/native/carousel";
import { Text } from "@zennui/native/text";
import { H1, H3 } from "@zennui/native/typography";
import { Image } from "expo-image";
import { Link, Redirect } from "expo-router";
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
  // {
  //   image: require("@assets/images/onboard-1.png"),
  //   title: "fast-easy-parking",
  //   description: "fast-easy-parking-description",
  // },
  // {
  //   image: require("@assets/images/onboard-2.png"),
  //   title: "security-priority",
  //   description: "security-priority-description",
  // },
  // {
  //   image: require("@assets/images/onboard-3.png"),
  //   title: "lookup-coins",
  //   description: "lookup-coins-description",
  // },
];

export default () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Redirect href={"/home"} />
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
          {/* <TimePicker
            className="-top-32"
            value={{
              hour: new Date().getHours(),
            }}
            minDisabled
          /> */}
        </View>
        <View
          className={"mt-auto gap-6 px-6"}
          style={{ paddingBottom: bottom + 20 }}
        >
          <Link href={"/log-in"} asChild>
            <Button color={"primary"} variant={"soft"}>
              <Text
                className={"font-header"}
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

        {/*<RoomCarousel />*/}
        <H3 className={"font-header font-normal text-3xl px-6"}>Maintenance</H3>
        <LayoutButton />
      </View>
      <LinearGradient
        colors={["rgba(57,181,74,0)", "rgba(57,181,74,0.6)"]}
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
