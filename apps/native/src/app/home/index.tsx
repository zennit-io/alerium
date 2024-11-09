import {LinearGradient as CustomLinearGradient} from "@/components/general/linear-gradient";
import {LayoutButton} from "@/components/home/layout-button";
import {BellIcon, BuildingIcon, SettingsIcon} from "@zennui/icons";
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
import OpenAI from "openai";

cssInterop(LinearGradient, { className: "style" });

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  organization: process.env.EXPO_PUBLIC_OPENAI_ORGANIZATION_ID,
});

export default () => {
  const askChat = async (content: string) => {
    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content,
          },
        ],
        // stream: true,
      });

      const responseText = completion.choices[0]?.message.content;
      console.log("Full response:", responseText);
    } catch (error) {
      console.error("Error in askChat:", error);
      throw error;
    }
  };

  const surveys = useQuery(api.services.survey.getAllSurveys, {});
console.log(surveys);
  return (
    <>
      <Pressable
        onPress={() => askChat("Say this is a test")}
        className="absolute top-20 z-50 right-6"
      >
        <InfoIcon className="size-8 text-primary" />
      </Pressable>
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
                    href={`/survey/${encodeURIComponent(name)}`}
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
                          {_creationTime}
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
