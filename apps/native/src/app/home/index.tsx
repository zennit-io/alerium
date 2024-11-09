import {LinearGradient as CustomLinearGradient} from "@/components/general/linear-gradient";
import {LayoutButton} from "@/components/home/layout-button";
import {BellIcon, BuildingIcon, InfoIcon, SettingsIcon} from "@zennui/icons";
import {Button} from "@zennui/native/button";
import {Carousel, CarouselContent, CarouselItem,} from "@zennui/native/carousel";
import {Text} from "@zennui/native/text";
import {H1, H3} from "@zennui/native/typography";
import {Image} from "expo-image";
import {LinearGradient} from "expo-linear-gradient";
import {cssInterop} from "nativewind";
import {Pressable, StyleSheet, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";

import {Link} from "expo-router";
import {useQuery} from "convex/react";
import {api} from "@junction/provider/convex/_generated/api";
import OpenAI from "openai";
import {format, isToday, isYesterday} from "date-fns";

cssInterop(LinearGradient, { className: "style" });


export default () => {
  const surveys = useQuery(api.services.survey.getAllSurveys, {});



  return (
    <>
      <ScrollView contentContainerClassName="pb-16">
        <Image
          source={require("@assets/images/radial-gradient.png")}
          className="absolute size-80"
        />
        <SafeAreaView className={"flex w-full flex-1 gap-4"}>
          <View className={"w-full flex-1 gap-10"}>
            <View
              className={"flex flex-row items-start justify-between px-6 pt-6 "}
            >
              <View>
                <H1 className={"font-normal text-5xl"}>Hi, John!</H1>
                <H3 className={"font-normal text-foreground-dimmed text-xl"}>
                  Welcome to ALERIUM
                </H3>
              </View>
              <View className={"flex flex-row items-center gap-4"}>
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
              <H3
                className={"px-6 font-bold font-header text-3xl"}
                style={{ fontFamily: "RFDewiExtended-Bold" }}
              >
                Categories
              </H3>

              <Carousel gap={16}>
                <CarouselContent className="px-5">
                  {EQUIPMENT_CATEGORIES.map(({ id, title, image }, index) => (
                    <CarouselItem
                      key={id}
                      index={index}
                      className="h-44 w-[250px] overflow-hidden rounded-2xl"
                    >
                      <Image source={image} className="size-full bg-red-500" />
                      <View className="absolute size-full justify-end">
                        <Text className="z-10 px-4 py-2 font-medium text-2xl text-foreground">
                          {title}
                        </Text>
                        <LinearGradient
                          colors={["transparent", "black"]}
                          className="absolute h-16 w-full"
                        />
                      </View>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </View>
            <View className="gap-6">
              <H3
                className={"px-6 font-bold font-header text-3xl"}
                style={{ fontFamily: "RFDewiExtended-Bold" }}
              >
                Recent Surveys
              </H3>
              <View className="gap-3">
                {surveys?.map(({ _id, name, _creationTime }) => (
                  <Link
                    href={`/survey/${encodeURIComponent(_id)}`}
                    key={_id}
                    asChild
                  >
                    <Pressable className="flex-row items-center gap-4 rounded-2xl px-6">
                      <BuildingIcon className="size-9 text-primary" />
                      <View className="flex-1 border-border border-b pb-3">
                        <Text className="font-medium text-2xl text-foreground">
                          {name}
                        </Text>
                        <Text className="border-red-500 border-b text-foreground-dimmed text-sm">
                          {formatDateString(_creationTime)}
                        </Text>
                      </View>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <LayoutButton />
      <CustomLinearGradient
        inverted
        className="absolute bottom-0 h-40 w-full"
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

const formatDateString = (date: string | number | Date) => {
  const wasYesterday = isYesterday(date);
  const isThisDay = isToday(date);
  return wasYesterday
    ? "Yesterday"
    : isThisDay
      ? "Today"
      : format(date, "dd MMM yyyy");
};
