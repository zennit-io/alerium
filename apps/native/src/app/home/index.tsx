import { LinearGradient as CustomLinearGradient } from "@/components/general/linear-gradient";
import { LayoutButton } from "@/components/home/layout-button";
import { RoomCarousel } from "@/components/home/room-carousel";
import { BellIcon, BuildingIcon, SettingsIcon } from "@zennui/icons";
import { Button } from "@zennui/native/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@zennui/native/carousel";
import { Text } from "@zennui/native/text";
import { H1, H3 } from "@zennui/native/typography";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

cssInterop(LinearGradient, { className: "style" });

export default () => {
  return (
    <>
      <ScrollView contentContainerClassName="pb-16">
        <Image
          source={require("@assets/images/radial-gradient.png")}
          className="size-80 absolute"
        />
        <SafeAreaView className={"flex-1 w-full flex gap-4"}>
          <View className={"flex-1 w-full gap-10"}>
            <View
              className={"flex-row flex items-start justify-between px-6 pt-6 "}
            >
              <View>
                <H1 className={"font-normal text-5xl"}>Hi, John!</H1>
                <H3 className={"font-normal text-xl text-foreground-dimmed"}>
                  Welcome to KONE App
                </H3>
              </View>
              <View className={" flex-row flex items-center gap-4"}>
                <Button
                  className={"size-12 rounded-full border-0 "}
                  style={styles.shadow}
                >
                  <BellIcon className={"text-primary"} />
                </Button>
                <Button
                  className={"size-12 rounded-full border-0 "}
                  style={styles.shadow}
                >
                  <SettingsIcon className={"text-primary"} />
                </Button>
              </View>
            </View>

            {/*<RoomCarousel />*/}
            <View className="gap-6">
              <H3 className={"font-header font-bold text-3xl px-6"}>
                Categories
              </H3>

              <Carousel gap={16}>
                <CarouselContent className="px-5">
                  {EQUIPMENT_CATEGORIES.map(({ id, title, image }, index) => (
                    <CarouselItem
                      key={id}
                      index={index}
                      className="w-[250px] h-44 rounded-2xl overflow-hidden"
                    >
                      <Image source={image} className="size-full bg-red-500" />
                      <View className="absolute size-full justify-end">
                        <Text className="py-2 px-4 z-10 font-medium text-primary text-2xl">
                          {title}
                        </Text>
                        <LinearGradient
                          colors={["transparent", "black"]}
                          className="w-full h-16 absolute"
                        />
                      </View>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </View>
            <View className="gap-6">
              <H3 className={"font-header font-bold text-3xl px-6"}>
                Recent Surveys
              </H3>
              <View className="gap-3">
                {RECENT_SURVEYS.map(({ id, title, date, Icon }, index) => (
                  <View
                    key={id}
                    className="flex-row items-center gap-4 px-6 rounded-2xl"
                  >
                    <Icon className="text-primary size-9" />
                    <View className="flex-1 border-b border-border pb-3">
                      <Text className="font-medium text-foreground text-2xl">
                        {title}
                      </Text>

                      <Text className="text-sm border-b border-red-500 text-foreground-dimmed">
                        {date}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <LayoutButton />
      <CustomLinearGradient
        inverted
        className="absolute bottom-0 w-full h-40"
      />
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.075,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

const EQUIPMENT_CATEGORIES = [
  {
    id: "1",
    title: "E-Stairs",
    image: require("@assets/images/equipment-category-1.png"),
  },
  {
    id: "2",
    title: "Elevators",
    image: require("@assets/images/equipment-category-2.png"),
  },
  {
    id: "3",
    title: "E-Doors",
    image: require("@assets/images/equipment-category-3.png"),
  },
];

const RECENT_SURVEYS = [
  {
    id: "1",
    title: "Lidl Helsinki 2",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "2",
    title: "Helsinki Mall",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "3",
    title: "Vaanta Airport",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "134623456",
    title: "Lidl Helsinki 2",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "234214214",
    title: "Helsinki Mall",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "323123123",
    title: "Vaanta Airport",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "12331",
    title: "Lidl Helsinki 2",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "23123",
    title: "Helsinki Mall",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
  {
    id: "213",
    title: "Vaanta Airport",
    date: "Yesterday",
    Icon: BuildingIcon,
  },
];
