"use client";

import { cn } from "@zenncore/utils";
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { popoverContentVariants } from "./_styles/popover";
import {
  Dialog,
  DialogContent,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  type DialogProps,
  DialogTrigger,
} from "./dialog";

type StackedDialogInstanceContextValue = {
  onChildOpenChange: (open: boolean) => void;
  index: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const StackedDialogInstanceContext =
  createContext<StackedDialogInstanceContextValue>({
    onChildOpenChange: () => {},
    index: 0,
    open: false,
    setOpen: () => {},
  });

type StackedDialogProviderValue = {
  previousDialogIndex: number;
  setPreviousDialogIndex: Dispatch<SetStateAction<number>>;
};

const StackedDialogContext = createContext<StackedDialogProviderValue>({
  previousDialogIndex: 0,
  setPreviousDialogIndex: () => {},
});

export const StackedDialogProvider = ({ children }: PropsWithChildren) => {
  const [previousDialogIndex, setPreviousDialogIndex] = useState(0);
  return (
    <StackedDialogContext.Provider
      value={{
        previousDialogIndex,
        setPreviousDialogIndex,
      }}
    >
      {children}
    </StackedDialogContext.Provider>
  );
};

export const StackedDialog = ({
  children,
  open = false,
  ...props
}: DialogProps) => {
  const instanceContext = useContext(StackedDialogInstanceContext);

  const handleOpenChange = (open: boolean) => {
    instanceContext.onChildOpenChange(open);
    instanceContext.setOpen(open);
    props.onOpenChange?.(open);
  };

  return (
    <Dialog
      {...props}
      onOpenChange={handleOpenChange}
      open={instanceContext.index === 0 ? undefined : instanceContext.open}
    >
      {children}
    </Dialog>
  );
};

export const StackedDialogContent = ({
  children,
  className,
  ...props
}: DialogContentProps) => {
  const { previousDialogIndex, setPreviousDialogIndex } =
    useContext(StackedDialogContext);
  const instanceContext = useContext(StackedDialogInstanceContext);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(
    instanceContext.index,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleChildOpenChange = (open: boolean) => {
    setCurrentDialogIndex((previousIndex) =>
      open ? previousIndex - 1 : previousIndex + 1,
    );
    setPreviousDialogIndex((previousIndex) =>
      open ? previousIndex + 1 : previousIndex - 1,
    );
  };

  // todo: implement controlled open state and make background modals appear on the center
  const style = {
    top: `${50 - (previousDialogIndex - currentDialogIndex) * 3}%`,
    // left: `${50 - (((lastIndex - index) * 3) * 0.5)}%`,
    opacity: `${100 - (previousDialogIndex - currentDialogIndex) * 3}%`,
    // scale: `${100 - (lastIndex - index) * 8}%`,
    // filter: `blur(${index === 0 ? 0 : (previousDialogIndex - index) * 2}px)`,
  };

  console.log(currentDialogIndex, isOpen);

  return (
    <DialogPortal>
      {instanceContext.index === 0 && <DialogOverlay />}

      <DialogContent
        className={cn(
          popoverContentVariants(),
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 isolate z-[500] grid w-full max-w-lg gap-0 divide-none bg-accent p-6 shadow-lg backdrop-blur-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        {...props}
        style={{ ...props.style, ...style }}
      >
        <StackedDialogInstanceContext.Provider
          value={{
            open: isOpen,
            setOpen: setIsOpen,
            onChildOpenChange: handleChildOpenChange,
            index: instanceContext.index + 1,
          }}
        >
          {currentDialogIndex}
          {children}
        </StackedDialogInstanceContext.Provider>
      </DialogContent>
    </DialogPortal>
  );
};

export const StackedDialogTrigger = DialogTrigger;
