import { Header } from "@/components/general/header";
import {
  CarIcon,
  EditIcon,
  LocationIcon,
  MicIcon,
  ProfileIcon,
  WalletIcon,
} from "@zennui/icons";
import { Text } from "@zennui/native/text";
import { H1 } from "@zennui/native/typography";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Header title={"Check Details"} />
      {/* <TimePicker /> */}
      <ScrollView
        contentContainerClassName="android:pb-28"
        style={{ paddingTop: top + 90 }}
      >
        <View className="gap-4 px-6">
          <View className="gap-1">
            <H1 style={{ fontFamily: "RFDewiExtended-Bold" }}>
              Lidl Helsinki 2
            </H1>
          </View>
          <View className="flex-row items-center gap-2 border-border border-t pt-4">
            <View className="pb-2">
              <ProfileIcon className="size-8 text-primary" />
            </View>
            <View className="flex-1 flex-row items-center gap-2 border-border border-b pb-2">
              <Text className="flex-1 text-2xl text-primary">Details</Text>
              <EditIcon className="size-7 text-foreground-dimmed" />
            </View>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Client</Text>
            <Text className="text-foreground-dimmed text-xl">KONE</Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Model</Text>
            <Text className="text-foreground-dimmed text-xl">SpeedElev 90</Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Serial ID</Text>
            <Text className="text-foreground-dimmed text-xl">S67665835</Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 pb-2">
            <Text className="text-foreground-dimmed text-xl">Weight</Text>
            <Text className="text-foreground-dimmed text-xl">1000kg</Text>
          </View>
          <View className="flex-row items-center gap-2 border-border border-t pt-4">
            <View className="pb-2">
              <MicIcon className="size-8 text-primary" />
            </View>
            <View className="flex-1 flex-row items-center gap-2 border-border border-b pb-2">
              <Text className="flex-1 text-2xl text-primary">Expertise</Text>
              <EditIcon className="size-7 text-foreground-dimmed" />
            </View>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-end gap-2 pb-2">
            <Text className="text-foreground-dimmed">The elevator is good</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
