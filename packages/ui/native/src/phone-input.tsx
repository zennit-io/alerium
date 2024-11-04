import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import {
  type ISO,
  type PhoneNumberType,
  createPhoneNumber,
  phoneNumberMap,
  refinePhoneNumber,
} from "@zenncore/utils/components";
import { ChevronDownIcon } from "@zennui/icons";
import { type Ref, forwardRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Pressable, type TextInput, View } from "react-native";
import { Input, inputRootVariants } from "./input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  type SelectProps,
  SelectTrigger,
} from "./select";
import { Text } from "./text";
import { H2 } from "./typography";

type PhoneInputClassListKey =
  | "root"
  | "input"
  | {
      countrySelect: PhoneCountrySelectClassListKey;
    };
export type PhoneInputProps = {
  nativeID?: string;
  value?: string;
  defaultValue?: string;
  defaultCountry?: ISO;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  ref?: Ref<TextInput>;
  className?: string;
  classList?: ClassList<PhoneInputClassListKey>;
} & Omit<Partial<ControllerRenderProps>, "name">;

export const PhoneInput = forwardRef(
  (
    {
      value,
      defaultCountry,
      disabled,
      className,
      classList,
      onChange,
      ...props
    }: PhoneInputProps,
    ref,
  ) => {
    const [phoneNumberComposer, setPhoneNumberComposer] =
      useState<PhoneNumberType>(createPhoneNumber(defaultCountry ?? "US"));

    const [state, setState] = useState<string | undefined>(undefined);

    const handleCountryChange = (iso: ISO, targetPhoneNumber?: string) => {
      const updatedPhoneNumberComposer = createPhoneNumber(iso);
      const formattedNumber = updatedPhoneNumberComposer.format(
        targetPhoneNumber ?? phoneNumber,
      );

      setPhoneNumberComposer(updatedPhoneNumberComposer);

      if (formattedNumber.significantNumber !== "") {
        onChange?.(formattedNumber.fullNumber);
      }

      return formattedNumber;
    };

    const resetPhoneNumber = (phoneNumber: string) => {
      let countryIso: ISO = phoneNumberComposer.iso;
      let countryCode = phoneNumberComposer.metadata.countryCode;
      let significantNumber = refinePhoneNumber(phoneNumber).replace(/^00/, "");

      for (const [iso, country] of Object.entries(phoneNumberMap)) {
        if (significantNumber.startsWith(country.metadata.countryCode)) {
          countryIso = iso as ISO;
          countryCode = country.metadata.countryCode;
          significantNumber = significantNumber.slice(countryCode.length);
          break;
        }
      }

      return handleCountryChange(countryIso, significantNumber);
    };

    const [phoneNumber, setPhoneNumber] = useState(() => {
      const formattedNumber = resetPhoneNumber(value ?? "");

      return formattedNumber.significantNumber;
    });

    const handlePhoneNumberChange = (
      event: NativeSyntheticEvent<TextInputChangeEventData>,
    ) => {
      event.preventDefault();
      const updatedSignificantNumber = event.nativeEvent.text;

      if (updatedSignificantNumber === "(0)") {
        setPhoneNumber("");
        onChange?.("");
        return;
      }

      const isPastedNumber =
        updatedSignificantNumber.length > phoneNumber.length + 1;

      if (isPastedNumber) {
        handlePaste(updatedSignificantNumber);
        return;
      }

      const formattedNumber = phoneNumberComposer.format(
        updatedSignificantNumber,
      );

      setPhoneNumber(formattedNumber.significantNumber);

      if (formattedNumber.significantNumber !== "") {
        onChange?.(formattedNumber.fullNumber);
      }
    };

    const handlePaste = (pastedPhoneNumber: string) => {
      if (disabled) return;

      const formattedPhoneNumber = resetPhoneNumber(pastedPhoneNumber);

      setPhoneNumber(formattedPhoneNumber.significantNumber);
    };

    return (
      <View
        className={cn(
          inputRootVariants({ disabled: false }),
          className,
          classList?.root,
        )}
      >
        <PhoneCountrySelect
          phoneNumberComposer={phoneNumberComposer}
          classList={classList?.countrySelect}
          onCountrySelect={(selectedCountry) => {
            const formattedPhoneNumber = handleCountryChange(selectedCountry);

            setPhoneNumber(formattedPhoneNumber.significantNumber);
          }}
        />

        <Input
          {...props}
          ref={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          textContentType="telephoneNumber"
          value={phoneNumber}
          type="number"
          className={cn("flex-1 border-0 p-0")}
          classList={{
            input: classList?.input,
          }}
          onChange={handlePhoneNumberChange}
        />
      </View>
    );
  },
);

type PhoneCountrySelectClassListKey = "root" | "iso" | "countryCode";

type PhoneCountrySelectProps = {
  phoneNumberComposer: PhoneNumberType;
  onCountrySelect: (iso: ISO) => void;
  className?: string;
  classList?: ClassList<PhoneCountrySelectClassListKey>;
} & SelectProps;

const PhoneCountrySelect = ({
  phoneNumberComposer,
  onCountrySelect,
  className,
  classList,
  ...props
}: PhoneCountrySelectProps) => {
  return (
    <Select
      {...props}
      value={phoneNumberComposer.iso}
      onValueChange={(iso) => onCountrySelect(iso as ISO)}
    >
      <View className="flex-row items-center gap-2">
        <SelectTrigger
          className={cn("border-0 p-0", className, classList?.root)}
          asChild
        >
          <Pressable>
            <View className="flex-row items-center gap-1">
              <ChevronDownIcon
                aria-hidden={true}
                className="size-4 text-foreground opacity-50"
              />
              <H2
                className={cn("text-foreground-dimmed text-xl", classList?.iso)}
              >
                {phoneNumberComposer.iso}
              </H2>
            </View>
          </Pressable>
        </SelectTrigger>
        <View className="h-[80%] w-px bg-border" />
        <Text className={classList?.countryCode}>
          +{phoneNumberComposer.metadata.countryCode}
        </Text>
      </View>
      <SelectContent>
        <SelectGroup>
          {Object.entries(phoneNumberMap).map(([iso, country]) => (
            <SelectItem key={iso} value={iso}>
              <Text className="text-lg">
                {country.metadata.countryName}{" "}
                <Text className={"text-foreground-dimmed"}>
                  (+{country.metadata.countryCode})
                </Text>
              </Text>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
