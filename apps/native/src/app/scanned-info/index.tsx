import { Header } from "@/components/general/header";
import { EditIcon, ScanIcon, View3DIcon } from "@zennui/icons";
import { Button } from "@zennui/native/button";
import { Drawer, DrawerContent } from "@zennui/native/drawer";
import { FormSubmitButton, InferredForm, field } from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { H1, H3 } from "@zennui/native/typography";
import { Link } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z } from "zod";

const config = {
  name: field({
    shape: "text",
    constraint: z.string().min(1),
    label: "Name Building",
    placeholder: "e.g Kone Building No.9",
    classList: {
      root: "gap-0",
      label: "text-2xl",
      input: {
        root: "border-0 gap-0",
        input: "placeholder:text-foreground-dimmed/50 text-xl h-auto",
      },
    },
  }),
};

export default () => {
  const { top } = useSafeAreaInsets();

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
        <Link href={"/scanned-info"} asChild>
          <Button
            color={"primary"}
            className="absolute self-center bottom-6 w-full"
          >
            <Text>Continue</Text>
          </Button>
        </Link>
      </View>
    </>
  );
};
