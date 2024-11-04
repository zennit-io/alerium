import type { ClassList } from "@zenncore/types";
import type { Icon } from "@zenncore/types/components";
import { cn } from "@zenncore/utils";
import { EyeClosedIcon, EyeIcon } from "@zennui/icons";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, type Ref, forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Button } from "./button";

export const inputRootVariants = cva(
  "h-10 w-full flex-row items-center justify-between gap-2 rounded-lg border border-border px-2",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      variant: {
        border: "group/input p-0.5 transition duration-300",
      },
    },
  },
);

export const inputVariants = cva(
  "flex-1 rounded-md text-foreground text-lg leading-[1.25] file:border-0 file:bg-transparent file:font-medium placeholder:text-foreground-dimmed",
  {
    variants: {
      variant: {
        border:
          "!size-[calc(100%-theme(spacing.[1]))] flex-row rounded-md px-3 py-2 text-foreground text-sm shadow-input transition duration-500 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:placeholder-neutral-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600",
      },
    },
  },
);

type RefinedInputProps = Omit<
  ComponentProps<typeof TextInput>,
  "editable" | "placeholderClassName"
>;

// | "placeholder"
type InputClassListKey = "root" | "input" | "decorator" | "passwordDecorator";
export type InputProps = {
  ref?: Ref<TextInput>;
  type?: "text" | "email" | "number" | "password";
  disabled?: boolean;
  StartDecorator?: Icon;
  EndDecorator?: Icon;
  passwordDecoratorHidden?: boolean;
  classList?: ClassList<InputClassListKey>;
  // inputRef?: Ref<TextInput>;
  // onChange?: (value: string) => void;
} & RefinedInputProps &
  VariantProps<typeof inputRootVariants>;

// replace forwardRef with ref prop when on React 19

const emailProps = {
  keyboardType: "email-address",
  autoCorrect: false,
  autoCapitalize: "none",
  textContentType: "emailAddress",
  autoComplete: "email",
  importantForAutofill: "yes",
} as const;

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      type = "text",
      value,
      StartDecorator,
      EndDecorator,
      disabled,
      passwordDecoratorHidden,
      variant,
      className,
      classList,
      ...props
    },
    ref,
  ) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(
      type === "password",
    );
    const passwordDecoratorShown =
      type === "password" && !passwordDecoratorHidden;

    const isDecoratorShown = EndDecorator || passwordDecoratorShown;

    return (
      <View
        className={cn(
          inputRootVariants({ disabled, variant }),
          className,
          classList?.root,
        )}
      >
        <TextInput
          ref={ref}
          value={value?.toString()}
          maxFontSizeMultiplier={1}
          className={cn(inputVariants({ variant }), classList?.input)}
          secureTextEntry={type === "password" && isPasswordHidden}
          keyboardType={type === "number" ? "number-pad" : props.keyboardType}
          textContentType={
            type === "password" ? "password" : props.textContentType
          }
          editable={!disabled}
          {...(type === "email" && emailProps)}
          // placeholderClassName={cn(
          //   "text-foreground-dimmed/30",
          //   classList?.placeholder,
          // )}
          // placeholderTextColor={"red"}
          {...props}
        />
        {isDecoratorShown && (
          <View className={"ml-auto"}>
            {EndDecorator && <EndDecorator className={"size-5"} />}
            {passwordDecoratorShown &&
              (isPasswordHidden ? (
                <Button
                  onPress={() => setIsPasswordHidden(false)}
                  className="border-0 bg-transparent"
                >
                  <EyeIcon
                    className={cn(
                      "size-5 text-foreground",
                      classList?.passwordDecorator,
                    )}
                  />
                </Button>
              ) : (
                <Button
                  onPress={() => setIsPasswordHidden(true)}
                  className="border-0 bg-transparent"
                >
                  <EyeClosedIcon
                    className={cn(
                      "size-5 text-foreground",
                      classList?.passwordDecorator,
                    )}
                  />
                </Button>
              ))}
          </View>
        )}
      </View>
    );
  },
);

const getKeyboardType = (type: InputProps["type"]) => {
  switch (type) {
    case "number":
      return "numeric";
    case "password":
      return "default";
    default:
      return "default";
  }
};
