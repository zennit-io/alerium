import {
  type FormConfig,
  FormSubmitButton,
  InferredForm,
  type InferredFormFields,
  field,
} from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { useRouter } from "expo-router";
import type { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z } from "zod";

const getSignInFormConfig = (t: ReturnType<typeof useTranslation>["t"]) => {
  const config = {
    email: field({
      shape: "text",
      constraint: z
        .string({ required_error: t("email.required") })
        .email(t("email.invalid")),
      type: "email",
      label: t("email.label"),
      placeholder: t("email.placeholder"),
      className: "rounded-none border-0 px-0 text-2xl text-foreground",
      classList: {
        label: "text-3xl",
        message: "text-lg",
        input: {
          input: "text-2xl placeholder:text-foreground-dimmed/40",
        },
      },
    }),
    password: field({
      shape: "text",
      constraint: z
        .string({ required_error: t("password.required") })
        .min(8, t("password.short")),
      placeholder: t("password.placeholder"),
      label: t("password.label"),
      type: "password",
      className: "rounded-none border-0 px-0 text-2xl text-foreground",
      classList: {
        label: "text-3xl",
        message: "text-lg",
        input: {
          input: "text-2xl placeholder:text-foreground-dimmed/40",
          passwordDecorator: "size-6",
        },
      },
    }),
  } satisfies FormConfig;

  return config;
};

export default () => {
  const { t } = useTranslation("", { keyPrefix: "sign-in" });
  const { top } = useSafeAreaInsets();
  const config = getSignInFormConfig(t);

  const handleFormSubmit: SubmitHandler<
    InferredFormFields<typeof config>
  > = async (data) => {};

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: top }}>
      <ScrollView
        contentContainerClassName={"android:pb-28"}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <View className="gap-6 px-6">
          <InferredForm
            config={config}
            className="gap-4"
            onSubmit={(data) => handleFormSubmit(data)}
          >
            <FormSubmitButton className="w-full">
              <Text className="text-2xl">{t("sign-in")}</Text>
            </FormSubmitButton>
          </InferredForm>
          <View className="my-4 flex-row items-center gap-4">
            <View className="h-px flex-1 bg-foreground-dimmed" />
            <Text className="text-foreground text-lg">{t("or")}</Text>
            <View className="h-px flex-1 bg-foreground-dimmed" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
