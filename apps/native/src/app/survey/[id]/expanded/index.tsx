import {Header} from "@/components/general/header";
import {EditIcon} from "@zennui/icons";
import {Text} from "@zennui/native/text";
import {H3, P} from "@zennui/native/typography";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {useQuery} from "convex/react";
import {api} from "@junction/provider/convex/_generated/api";
import type {Id} from "@junction/provider/convex/_generated/dataModel";

export default () => {
  const { top } = useSafeAreaInsets();
  const { report: reportId } = useLocalSearchParams<{ report: Id<"reports"> }>();
  const report = useQuery(api.services.report.getReportById, {
    id: reportId,
  });

  if (!report) return null;

  return (
    <>
      <Header title="More Info" />
      <View
        className="flex-1 px-6 gap-8"
        style={{
          paddingTop: top + 60,
        }}
      >
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus.
        </P>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Manufacturer</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.manufacturer}
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Scan ID</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.serialNumber}
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Model</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.model}
              </Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Weight</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.weight}KG
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Serial #</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.serialNumber}
              </Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Dimensions</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.dimensions}
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Material</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.material}
              </Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Class</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                {report.class}
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
