import type {ClassList} from "@zenncore/types";
import {cn} from "@zenncore/utils";
import {ChevronLeftIcon} from "@zennui/icons";
import {H1, P} from "@zennui/native/typography";
import {useRouter} from "expo-router";
import {Pressable, View, type ViewProps} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LinearGradient} from "./linear-gradient";

type HeaderClassListKey = "root" | { button: "icon" } | "title";

export type HeaderProps = {
  title: string;
  backButtonHidden?: boolean;
  className?: string;
  classList?: ClassList<HeaderClassListKey>;
  gradient?: {
    start: string;
    end: string;
  };
  locations?: number[];
  variant?: "primary" | "default";
  subtitle?: string;
} & ViewProps;

export const Header = ({
  title,
  backButtonHidden,
  className,
  classList,
  gradient,
  locations = [0.2, 1],
  style,
  variant,
  subtitle,
  ...props
}: HeaderProps) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View className={"absolute z-[1000] w-full flex flex-col"}>
      <LinearGradient
        locations={locations}
        variant={variant}
        colors={gradient ? [gradient.start, gradient.end] : undefined}
        inverted={false}
        className="absolute top-0 h-36 w-full"
      />
      <View
        className={cn(
          "flex h-12 flex-row items-center gap-2 px-4",
          className,
          classList?.root,
        )}
        style={[{ top }, style]}
        {...props}
      >
        {!backButtonHidden && (
          <Pressable
            className={cn("rounded-full", classList?.button?.DEFAULT)}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon
              className={cn(
                "size-8 text-foreground-dimmed",
                variant === "primary" && "text-white",
                classList?.button?.icon,
              )}
            />
          </Pressable>
        )}
        <H1
          className={cn(
            "text-center font-bold text-primary",
            variant === "primary" && "text-white",
            classList?.title,
          )}
          style={{ fontFamily: "RFDewiExtended-Bold" }}
        >
          {title}
        </H1>
      </View>
      {subtitle && (
        <P className={"text-foreground-dimmed ml-[50px] text-xl"} style={{ top }}>
          {subtitle}
        </P>
      )}
    </View>
  );
};
