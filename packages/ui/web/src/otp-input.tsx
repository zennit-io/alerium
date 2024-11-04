"use client";

import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { useRef, useState } from "react";
import { inputRootVariants, inputVariants } from "./input";

// todo: add alphanumeric value support

type OTPInputClassListKey = "root" | "input" | "caret";
export type OTPInputProps = {
  length?: number;
  name?: string;
  value?: string;
  onChange?: (otp: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  caretEnabled?: boolean;
  className?: string;
  classList?: ClassList<OTPInputClassListKey>;
  disabled?: boolean;
};

const replaceOTP = (otp: string, position: number, replacement: string) => {
  let updatedOtp = otp;
  if (position > otp.length) updatedOtp = otp.padEnd(position, " ");

  return (
    updatedOtp.slice(0, position) +
    replacement +
    updatedOtp.slice(position + replacement.length)
  );
};

export const OTPInput = ({
  length = 4,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  caretEnabled = true,
  disabled,
  className,
  classList,
}: OTPInputProps) => {
  const [otp, setOtp] = useState(value ?? "");
  const OTPInputFieldsRef = useRef<HTMLInputElement[]>([]);
  const [focusedInputPosition, setFocusedInputPosition] = useState<
    number | null
  >(null);

  const handleOtpChange = (value: string, position: number) => {
    const updatedOtp = replaceOTP(otp, position, value).slice(0, length);
    const formattedOtp = updatedOtp.replace(/\s/g, "");

    setOtp(updatedOtp);
    onChange?.(formattedOtp);

    return updatedOtp;
  };

  return (
    <div className={cn("flex w-48 gap-2", className, classList?.root)}>
      {Array.from({ length }, (_, index) => {
        const isFocused = focusedInputPosition === index;
        const isFilled = otp[index]?.trim();
        const inputPlaceholder =
          caretEnabled && isFocused ? "" : placeholder?.[index];

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className={"relative flex-1"}>
            <input
              value={otp[index] ?? ""}
              name={`${name}-1`}
              maxLength={1}
              inputMode={"numeric"}
              className={cn(
                inputVariants(),
                inputRootVariants(),
                "text-center caret-transparent placeholder:text-foreground-dimmed/50 focus:border-primary",
                isFilled && "border-foreground/40",
                classList?.input,
              )}
              placeholder={inputPlaceholder}
              disabled={disabled}
              // invalid={otp[index] === "" && invalid} todo: highlight empty inputs
              ref={(OTPInputFieldRef) => {
                if (OTPInputFieldRef)
                  OTPInputFieldsRef.current[index] = OTPInputFieldRef;
              }}
              onPaste={(event) => {
                event.preventDefault();
                const clipboardData =
                  event.clipboardData?.getData("text/plain");

                const isClipboardDataValidOtp =
                  Number.isInteger(Number(clipboardData)) &&
                  Number(clipboardData) > 0;

                if (isClipboardDataValidOtp) {
                  const updatedOtp = handleOtpChange(clipboardData, index);

                  const otpLength = updatedOtp.length;
                  const targetInputPosition =
                    otpLength === length ? otpLength - 1 : otpLength;

                  OTPInputFieldsRef.current[targetInputPosition]?.focus();
                }
              }}
              onChange={() => {}}
              onFocus={() => setFocusedInputPosition(index)}
              onKeyDown={({ nativeEvent }) => {
                const { key } = nativeEvent;

                if (key === "ArrowRight" && index < length - 1) {
                  OTPInputFieldsRef.current[index + 1]?.focus();
                  return;
                }

                if (key === "ArrowLeft" && index > 0) {
                  OTPInputFieldsRef.current[index - 1]?.focus();
                  return;
                }

                if (key === "Backspace") {
                  const isInputEmpty = !otp[index]?.trim();

                  if (isInputEmpty && index > 0) {
                    handleOtpChange(" ", index - 1);
                    OTPInputFieldsRef.current[index - 1]?.focus();
                  } else handleOtpChange(" ", index);

                  return;
                }

                const isKeyNumber = !Number.isNaN(Number(key));

                if (isKeyNumber && otp[index] !== "") {
                  const isNextInputEmpty =
                    index !== length - 1 && !otp[index + 1]?.trim();

                  handleOtpChange(key, index);

                  if (isNextInputEmpty) {
                    OTPInputFieldsRef.current[index + 1]?.focus();
                  }
                }
              }}
              onBlur={() => {
                setFocusedInputPosition(null);
                onBlur?.();
              }}
            />
            {caretEnabled && isFocused && !isFilled && (
              <OTPInputCaret className={classList?.caret} />
            )}
          </div>
        );
      })}
    </div>
  );
};

type OTPInputCaretProps = {
  className?: string;
};

const OTPInputCaret = ({ className }: OTPInputCaretProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
      <div className={cn("h-[40%] w-px bg-foreground", className)} />
    </div>
  );
};
