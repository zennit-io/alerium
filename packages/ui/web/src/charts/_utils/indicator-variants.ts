import { cva } from "class-variance-authority";

export const indicatorVariants = cva("", {
  variants: {
    variant: {
      square: "flex size-3 min-h-3 min-w-3 rounded",
      circle: "flex size-3 min-h-3 min-w-3 rounded-full",
      line: "h-4 min-h-4 w-0.5 min-w-0.5 rounded-lg",
      dots: "after:-bottom-0.5 before:-top-1 relative size-0.5 rounded-full before:relative before:block before:size-0.5 before:rounded-full before:bg-inherit after:relative after:block after:size-0.5 after:rounded-full after:bg-inherit",
      pill: "after:-bottom-[3px] before:-top-[3px] relative h-1 w-0.5 before:relative before:block before:size-0.5 before:rounded-t-full before:bg-inherit after:relative after:block after:size-0.5 after:rounded-b-full after:bg-inherit",
      triangle:
        "size-0 border-x-4 border-x-accent border-b-8 border-b-transparent",
      diamond:
        "!bg-transparent -top-[calc(3px+1px)] after:-left-[3px] relative border-[3px] border-transparent border-b-[6px] border-b-red-500 after:absolute after:top-[6px] after:rotate-180 after:border-[3px] after:border-[transparent] after:border-b-[6px] after:border-b-inherit",
    },
  },
  defaultVariants: {
    variant: "square",
  },
});
