import {
  NUMBER_OF_SIGN_UP_STEPS,
  SignUpProvider,
  signUpAtom,
} from "@/components/auth/providers/sign-up";
import { SignUpInputFocusProvider } from "@/components/auth/providers/sign-up-input-focus";
import { FormProgressBar } from "@/components/general/form-progress-bar";
import { cn } from "@zenncore/utils";
import { CarParkingGarageIcon, UserIcon } from "@zennui/icons";
import { H3 } from "@zennui/native/typography";
import { Link, Stack, usePathname } from "expo-router";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const { t } = useTranslation("", { keyPrefix: "sign-up" });
  const { top } = useSafeAreaInsets();

  return (
    <>
      <SignUpProvider>
        <ScrollView
          contentContainerClassName="flex-1 gap-10"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{ paddingTop: top + 90 }}
        >
          <SignUpSwitch />
          <SignUpInputFocusProvider>
            <Stack
              initialRouteName="client"
              screenOptions={{
                headerShown: false,
                animation: "fade",
              }}
            />
          </SignUpInputFocusProvider>
        </ScrollView>
        <SignUpProgressBar />
      </SignUpProvider>
    </>
  );
};

const INITIAL_SIGN_UP_ROUTES = [
  "/sign-up",
  "/sign-up/client",
  "/sign-up/provider",
];

const SignUpSwitch = () => {
  const { t } = useTranslation("", { keyPrefix: "sign-up" });
  const pathname = usePathname();
  const isProviderSignUp = pathname.includes("sign-up/provider");

  return (
    <View
      className={cn(
        "pointer-events-none mx-auto flex-row items-center justify-center gap-2 rounded-full bg-background-dimmed p-2 opacity-50 transition-all duration-300",
        INITIAL_SIGN_UP_ROUTES.includes(pathname) &&
          "pointer-events-auto opacity-100",
      )}
    >
      <Link href={"/sign-up/client"} replace asChild>
        <Pressable
          className={cn(
            "flex-row items-center gap-2 rounded-full bg-transparent px-4 py-1 opacity-100 transition-colors duration-200",
            !isProviderSignUp && "bg-primary",
          )}
          disabled={!isProviderSignUp}
        >
          <UserIcon className={"text-foreground"} />
          <H3>{t("client")}</H3>
        </Pressable>
      </Link>
      <Link href={"/sign-up/provider"} replace asChild>
        <Pressable
          className={cn(
            "flex-row items-center gap-2 rounded-full bg-transparent px-4 py-1 opacity-100 transition-colors duration-200",
            isProviderSignUp && "bg-primary",
          )}
          disabled={isProviderSignUp}
        >
          <CarParkingGarageIcon className={"text-foreground"} />
          <H3>{t("provider")}</H3>
        </Pressable>
      </Link>
    </View>
  );
};

const SignUpProgressBar = () => {
  const { progress } = useAtomValue(signUpAtom);

  return (
    <FormProgressBar
      className="absolute w-full bottom-0 z-10"
      progress={progress}
      numberOfSteps={NUMBER_OF_SIGN_UP_STEPS}
    />
  );
};
