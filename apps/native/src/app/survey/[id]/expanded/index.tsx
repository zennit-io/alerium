import {Header} from "@/components/general/header";
import {EditIcon} from "@zennui/icons";
import {Text} from "@zennui/native/text";
import {H3, P} from "@zennui/native/typography";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default () => {
  const { top } = useSafeAreaInsets();
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
            <H3 className="3xl">Manifacture</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">Kone</Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Scan ID</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">S67665834</Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Model</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">SpeedElev</Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Weight</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">1000kg</Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Serial #</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                M3128978312
              </Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Dimensions</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">
                20 x 20 x 20
              </Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
        <View className="flex-row gap-8 justify-between">
          <View className="flex-1">
            <H3 className="3xl">Material</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">SpeedElev</Text>
              <EditIcon className="text-foreground-dimmed/50 size-6" />
            </View>
          </View>
          <View className="flex-1">
            <H3 className="3xl">Weight</H3>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-2xl text-foreground-dimmed">1000kg</Text>
              <EditIcon className="text-foreground-dimmed/50  size-6" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
