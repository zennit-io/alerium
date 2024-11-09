import * as Slot from "@rn-primitives/slot";
import type {SlottableTextProps, TextRef} from "@rn-primitives/types";
import {cn} from "@zenncore/utils";
import type {Ref} from "react";
import {Text as RNText} from "react-native";

export type H1Props = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const H1 = ({
  className,
  asChild = false,
  style,
  ...props
}: H1Props) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      role="heading"
      aria-level="1"
      maxFontSizeMultiplier={1.2}
      className={cn(
        "font-extrabold text-4xl text-foreground tracking-tight lg:text-5xl",
        className,
      )}
      style={[
        {
          fontFamily: "RFDewiExtended-Bold",
        },
        style,
      ]}
      {...props}
    />
  );
};

export type H2Props = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const H2 = ({ className, asChild = false, ...props }: H2Props) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      role="heading"
      aria-level="2"
      maxFontSizeMultiplier={1.2}
      className={cn(
        "border-border border-b font-semibold text-3xl text-foreground tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
};

export type H3Props = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const H3 = ({ className, asChild = false, ...props }: H3Props) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      role="heading"
      aria-level="3"
      maxFontSizeMultiplier={1.2}
      className={cn(
        "font-semibold text-2xl text-foreground tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export type H4Props = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const H4 = ({ className, asChild = false, ...props }: H4Props) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      role="heading"
      aria-level="4"
      maxFontSizeMultiplier={1.2}
      className={cn(
        "font-semibold text-foreground text-xl tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export type ParagraphProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

const Paragraph = ({
  className,
  asChild = false,
  ...props
}: ParagraphProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn("text-base text-foreground", className)}
      {...props}
    />
  );
};

export { Paragraph as P };

export type BlockQuoteProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const BlockQuote = ({
  className,
  asChild = false,
  ...props
}: BlockQuoteProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn(
        "mt-4 border-border border-l-2 pl-3 text-base text-foreground italic",
        className,
      )}
      {...props}
    />
  );
};

export type CodeProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const Code = ({ className, asChild = false, ...props }: CodeProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn(
        "relative rounded-md bg-background-dimmed px-[0.3rem] py-[0.2rem] font-semibold text-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
};

export type LeadProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const Lead = ({ className, asChild = false, ...props }: LeadProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn("text-foreground-dimmed text-xl", className)}
      {...props}
    />
  );
};

export type LargeProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const Large = ({ className, asChild = false, ...props }: LargeProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn("font-semibold text-foreground text-xl", className)}
      {...props}
    />
  );
};

export type SmallProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const Small = ({ className, asChild = false, ...props }: SmallProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn(
        "font-medium text-foreground text-sm leading-none",
        className,
      )}
      {...props}
    />
  );
};

export type MutedProps = {
  ref?: Ref<TextRef>;
} & SlottableTextProps;

export const Muted = ({ className, asChild = false, ...props }: MutedProps) => {
  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      maxFontSizeMultiplier={1.2}
      className={cn("text-foreground-dimmed text-sm", className)}
      {...props}
    />
  );
};
