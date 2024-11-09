import {Header} from "@/components/general/header";
import {EditIcon} from "@zennui/icons";
import {Button} from "@zennui/native/button";
import {Text} from "@zennui/native/text";
import {H3, P} from "@zennui/native/typography";
import {Link} from "expo-router";
import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <>
      <Header title="Scanned Info" />
      <View
        className="flex-1 px-6"
        style={{
          paddingTop: top + 60,
        }}
      >
        <View className="gap-8">
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
                <Text className="text-2xl text-foreground-dimmed">
                  S67665834
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
                  SpeedElev
                </Text>
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
        <Link href={"/expertise"} asChild>
          <Button
            color={"primary"}
            className="absolute self-center mb-6 w-full"
            style={{ bottom }}
          >
            <Text>Continue</Text>
          </Button>
        </Link>
      </View>
    </>
  );
};
