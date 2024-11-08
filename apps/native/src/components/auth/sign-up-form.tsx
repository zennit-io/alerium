import {
  type SignUpFields,
  signUpAtom,
} from "@/components/auth/providers/sign-up";
import { Button } from "@zennui/native/button";
import { useIsFocused } from "@react-navigation/native";
import type { ButtonProps } from "@zennui/native/button";
import {
  type FieldConfig,
  Form,
  InferredFormControl,
  type InferredFormFields,
  type UseInferredFormParams,
  useInferredForm,
} from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { type Href, useFocusEffect, useRouter } from "expo-router";
import { useAtom } from "jotai";
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSignUpInputFocus } from "./providers/sign-up-input-focus";

type SignUpFormConfig = Partial<
  Record<keyof Omit<SignUpFields, "progress" | "type">, FieldConfig>
>;
type UseSignUpForm = UseFormReturn<SignUpFormConfig>;

const AuthFormContext = createContext<UseSignUpForm>(null);

const useAuthFormContext = () => useContext(AuthFormContext);

type OnFormSubmitReturn =
  | undefined
  | {
      shouldReturn?: boolean;
      shouldNavigate?: boolean;
      nextStep?: Href<string>;
    };
export type AuthenticationFormProps = {
  config: SignUpFormConfig;
  field: keyof SignUpFormConfig;
  numberOfSteps: number;
  step: number;
  nextStep?: Href<string>;
  keyboardPersisted?: boolean;
  keyboardDefaultOpen?: boolean;
  formProps?: NonNullable<UseInferredFormParams<SignUpFormConfig>[1]>["props"];
  onFormSubmit?: (
    data: InferredFormFields<SignUpFormConfig>,
    token?: SignUpFields["token"],
  ) => Promise<OnFormSubmitReturn> | OnFormSubmitReturn;
} & PropsWithChildren;

export const SignUpForm = ({
  config,
  field,
  numberOfSteps,
  step,
  nextStep,
  keyboardPersisted,
  children,
  keyboardDefaultOpen,
  formProps,
  onFormSubmit,
}: AuthenticationFormProps) => {
  const { t } = useTranslation("", { keyPrefix: "sign-up" });
  const router = useRouter();
  const [signUpFields, setSignUpFields] = useAtom(signUpAtom);
  const focusSignUpInput = useSignUpInputFocus();
  const form = useInferredForm<SignUpFormConfig>(config, {
    defaultValues: {
      [field]: signUpFields[field],
    },
    props: formProps,
  });
  const isFocused = useIsFocused();
  const ref = useRef(null);
  const translateX = useSharedValue(10);

  const opacity = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-10, 0, 10],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
  });

  const handleFormSubmit = (
    data: InferredFormFields<typeof config>,
    // form?: UseSignUpForm,
  ) => {
    const progress = (100 / numberOfSteps) * step;

    // const { shouldReturn, token } = onFormSubmit?.(data) ?? {};
    onFormSubmit?.(data);

    // if (shouldReturn) return;
    if (keyboardPersisted) focusSignUpInput();

    setSignUpFields((previousSignUpFields) => ({
      ...previousSignUpFields,
      progress: Math.max(previousSignUpFields.progress, progress),
      [field]: data[field],
    }));

    translateX.value = withTiming(-10, { duration: 200 });
    if (nextStep) router.push(nextStep);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: form doesn't trigger useEffect
  useEffect(() => {
    if (!form.formState.isSubmitting || !children) return;

    form.handleSubmit((data) => handleFormSubmit?.(data))();
  }, [form.formState.isSubmitting, form.handleSubmit]);

  useEffect(() => {
    if (isFocused) {
      translateX.value = withDelay(300, withTiming(0, { duration: 200 }));
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      if (!keyboardDefaultOpen) return;
      setTimeout(() => ref.current?.focus(), 30);
    }, [keyboardDefaultOpen]),
  );

  return (
    <Form {...form}>
      <View className="h-64 justify-between gap-6 px-6">
        <Animated.View style={{ opacity, transform: [{ translateX }] }}>
          <InferredFormControl name={field} {...config[field]} ref={ref} />
        </Animated.View>
        {children ? (
          <AuthFormContext.Provider value={form as UseSignUpForm}>
            {children}
          </AuthFormContext.Provider>
        ) : (
          <Button
            color={"primary"}
            onPress={form.handleSubmit((data) => handleFormSubmit(data))}
          >
            <Text className="text-2xl text-foreground">{t("continue")}</Text>
          </Button>
        )}
      </View>
    </Form>
  );
};

type FormSubmitButtonProps = ButtonProps;

export const FormSubmitButton = ({
  variant = "default",
  color = "primary",
  children,
  onPress,
  ...props
}: FormSubmitButtonProps) => {
  const form = useAuthFormContext();

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      onPress={(event) => {
        onPress?.(event);
        form.handleSubmit(() => {})();
      }}
    >
      {children}
    </Button>
  );
};
