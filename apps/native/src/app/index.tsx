import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@zennui/native/button";
import { BellIcon, SettingsIcon } from "@zennui/icons";
import { StyleSheet, View } from "react-native";
import { H1, H3 } from "@zennui/native/typography";
import { LayoutButton } from "@/components/home/layout-button";
import {RoomCarousel} from "@/components/home/room-carousel";

export default () => {
  return (
    <SafeAreaView className={"flex-1 flex gap-4"}>
      <View className={"size-full"}>
        <View
          className={"w-full flex-row flex items-start justify-between p-6 "}
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
        <H3 className={"font-header font-normal text-3xl px-6"}>Maintenance</H3>
        <LayoutButton />
      </View>
    </SafeAreaView>
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
