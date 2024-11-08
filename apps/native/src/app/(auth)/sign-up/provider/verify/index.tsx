import {
  NUMBER_OF_SIGN_UP_STEPS,
  signUpAtom,
} from "@/components/auth/providers/sign-up";
import { useIsFocused } from "@react-navigation/native";
import { LoadingIcon } from "@zennui/icons";
import {
  Form,
  type FormConfig,
  InferredFormControl,
  type InferredFormFields,
  field,
  useInferredForm,
} from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { useFocusEffect, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { type TextInput, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { z } from "zod";

const config = {
  otp: field({
    shape: "otp",
    constraint: z
      .string({
        required_error: "Verification code is required",
      })
      .min(4, "Verification code must contain 4 characters"),
    label: "Verify phone number",
    autoFocus: true,
    classList: {
      message: "text-md",
      label: "text-4xl",
      input: {
        root: "h-16 border-0 px-0",
        input: "text-3xl placeholder:text-foreground-dimmed/40",
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const router = useRouter();
  const isFocused = useIsFocused();
  const [signUp, setSignUp] = useAtom(signUpAtom);
  const form = useInferredForm(config, {
    props: {
      mode: "onChange",
    },
  });
  const ref = useRef<TextInput>(null);
  const translateX = useSharedValue(10);

  const opacity = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-10, 0, 10],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
  });

  const handleFormSubmit: SubmitHandler<
    InferredFormFields<typeof config>
  > = async (data) => {
    const step = 3;
    const progress = (100 / NUMBER_OF_SIGN_UP_STEPS) * step;

    setIsVerifyingOTP(true);
    setIsVerifyingOTP(false);

    setSignUp((previousSignUp) => ({
      ...previousSignUp,
      progress: Math.max(previousSignUp.progress, progress),
    }));

    translateX.value = withTiming(-10, { duration: 200 });
    router.replace("/sign-up/provider/birthdate");
  };

  useEffect(() => {
    if (isFocused) {
      translateX.value = withDelay(300, withTiming(0, { duration: 200 }));
    }
  }, [isFocused]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect doesn't trigger on function dependencies
  useEffect(() => {
    if (form.formState.isValid) handleFormSubmit(form.getValues());
  }, [form.formState.isValid, form.getValues]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => ref.current?.focus(), 30);
    }, []),
  );

  return (
    <Form {...form}>
      <View className="h-64 gap-2 px-6">
        <Animated.View style={{ opacity, transform: [{ translateX }] }}>
          <InferredFormControl
            name={"otp"}
            {...config.otp}
            ref={ref}
            disabled={isVerifyingOTP}
          />
        </Animated.View>
        {isVerifyingOTP && (
          <View className="flex-row justify-center gap-2">
            <View className="animate-spin">
              <LoadingIcon className="text-foreground" />
            </View>
            <Text className="text-2xl text-foreground">Verifying OTP</Text>
          </View>
        )}
      </View>
    </Form>
  );
};
