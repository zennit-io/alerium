"use client";

import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import * as Clipboard from "expo-clipboard";
import {
  type MutableRefObject,
  type Ref,
  forwardRef,
  useRef,
  useState,
} from "react";
import { TextInput, View } from "react-native";
import { inputRootVariants, inputVariants } from "./input";

// todo: add alphanumeric value support

const isValidOTPChar = (value: unknown, isAlphanumeric?: boolean) => {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
};

const getOTPInitValue = (
  value: string | undefined,
  length: number,
): string[] => {
  return isValidOTPChar(value)
    ? value.split("").slice(0, length)
    : Array(length).fill("");
};

const updateOTP = (otp: string[], position: number, replacement: string) => {
  const formattedReplacement =
    replacement.length <= 1 ? [replacement] : replacement.split("");

  return [
    ...otp.slice(0, position),
    ...formattedReplacement,
    ...otp.slice(position + formattedReplacement.length),
  ];
};

type OTPInputClassListKey = "root" | "input" | "caret";
export type OTPInputProps = {
  length?: number;
  nativeID?: string;
  value?: string;
  onChange?: (otp: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  caretEnabled?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  ref?: Ref<TextInput>;
  classList?: ClassList<OTPInputClassListKey>;
};

export const OTPInput = forwardRef(
  (
    {
      length = 4,
      nativeID,
      value,
      onChange,
      onBlur,
      placeholder,
      caretEnabled = true,
      disabled,
      autoFocus,
      // ref,
      className,
      classList,
    }: OTPInputProps,
    ref,
  ) => {
    const [otp, setOtp] = useState(getOTPInitValue(value, length));
    const OTPInputFieldsRef = useRef<TextInput[]>([]);
    const [focusedInputPosition, setFocusedInputPosition] = useState<
      number | null
    >(null);

    const handleOTPChange = (value: string | null, position: number) => {
      const updatedOTP = updateOTP(otp, position, value).slice(0, length);

      setOtp(updatedOTP);
      onChange?.(updatedOTP.join(""));

      return updatedOTP;
    };

    const handleOTPInputChange = async (value: string, position: number) => {
      const isPastedValue = value.trim().length > 1 && otp[position] === "";
      // todo: fix edge case where paste doesn't work on filled input

      const isOTPRemoved = value === "";

      if (isOTPRemoved) return;

      if (isPastedValue) {
        const clipboardValue = await Clipboard.getStringAsync();

        if (clipboardValue.trim() === "") return;

        const isPastedOtpValid = isValidOTPChar(value);

        if (!isPastedOtpValid) return;

        const updatedOTP = handleOTPChange(value, position);
        const otpLength = updatedOTP.length;
        const targetInputPosition =
          otpLength === length ? otpLength - 1 : otpLength;

        OTPInputFieldsRef.current[targetInputPosition]?.focus();
        return;
      }

      const updatedOTPChar = value.slice(-1);
      const isValidOTP = isValidOTPChar(updatedOTPChar);

      if (!isValidOTP) return;

      const isNextInputEmpty =
        position !== length - 1 &&
        (otp[position + 1] === undefined || otp[position + 1] === "");

      handleOTPChange(updatedOTPChar, position);

      if (isNextInputEmpty) {
        OTPInputFieldsRef.current[position + 1]?.focus();
      }
    };

    return (
      <View
        className={cn("flex-row justify-center", className, classList?.root)}
      >
        {Array.from({ length }, (_, index) => {
          const isFocused = focusedInputPosition === index;
          const isFilled = !!otp[index];
          const inputPlaceholder =
            caretEnabled && isFocused ? "" : placeholder?.[index];

          return (
            <View
              // biome-ignore lint/suspicious/noArrayIndexKey: otp inputs order doesn't change
              key={index}
              className={"flex-1"}
            >
              <TextInput
                value={otp[index]}
                nativeID={`${nativeID}-1`}
                maxFontSizeMultiplier={1.2}
                inputMode={"numeric"}
                autoFocus={autoFocus && index === 0}
                autoComplete={"sms-otp"}
                textContentType={"oneTimeCode"}
                placeholder={inputPlaceholder}
                editable={!disabled}
                selection={{
                  start: otp[index]?.length ?? 0,
                  end: otp[index]?.length ?? 0,
                }}
                selectionColor={"transparent"}
                // invalid={otp[index] === "" && invalid} todo: highlight empty inputs
                ref={(otpInputFieldRef) => {
                  if (ref && index === 0) {
                    if (typeof ref === "function") ref(otpInputFieldRef);
                    else if (ref) {
                      (ref as MutableRefObject<TextInput>).current =
                        otpInputFieldRef;
                    }
                  }
                  if (otpInputFieldRef) {
                    OTPInputFieldsRef.current[index] = otpInputFieldRef;
                  }
                }}
                className={cn(
                  inputVariants(),
                  inputRootVariants({ disabled }),
                  "flex-row rounded-none text-center placeholder:text-foreground-dimmed/50",
                  index === 0 && "rounded-l-lg",
                  index === length - 1 && "rounded-r-lg",
                  isFilled && "border-foreground/40",
                  isFocused && "border-primary",
                  classList?.input,
                )}
                onChange={(event) =>
                  handleOTPInputChange(event.nativeEvent.text, index)
                }
                onFocus={() => setFocusedInputPosition(index)}
                onKeyPress={({ nativeEvent }) => {
                  const { key } = nativeEvent;
                  const isInputEmpty =
                    otp[index] === undefined || otp[index] === "";

                  if (key !== "Backspace") return;

                  if (isInputEmpty && index > 0) {
                    handleOTPChange("", index - 1);
                    OTPInputFieldsRef.current[index - 1]?.focus();
                  } else handleOTPChange("", index);
                }}
                onBlur={() => {
                  setFocusedInputPosition(null);
                  onBlur?.();
                }}
              />
              {caretEnabled && isFocused && !isFilled && (
                <OTPInputCaret className={classList?.caret} />
              )}
            </View>
          );
        })}
      </View>
    );
  },
);

type OTPInputCaretProps = {
  className?: string;
};

const OTPInputCaret = ({ className }: OTPInputCaretProps) => {
  return (
    <View className="pointer-events-none absolute size-full animate-caret-blink items-center justify-center">
      <View className={cn("h-[50%] w-px bg-foreground", className)} />
    </View>
  );
};
