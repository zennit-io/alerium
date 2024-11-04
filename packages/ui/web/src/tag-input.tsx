"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { XIcon } from "@zennui/icons";
import * as CommandPrimitive from "cmdk";
import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import { popoverContentVariants } from "./_styles/popover";
import { Badge } from "./badge";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { Input } from "./input";

export type Tag = {
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
};

// todo: tag input class list keys
export type TagInputClassListKey = "root" | "selectedTag" | "suggestedTag";

export type TagInputProps = {
  value?: Tag[];
  defaultValue?: Tag[];
  onChange?: (value: Tag[]) => void;
  tagOptions?: Tag[];
  onlyTagOptions?: boolean;
  maxTags?: number;
  autoComplete?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  placeholder?: string;
  allowDuplicates?: boolean;
  clearButtonEnabled?: boolean;
  className?: string;
  classList?: ClassList<TagInputClassListKey>;
};

// todo: add tag on blur
// todo: remove double tag add when options are available
// todo: max tag length

export const TagInput = ({
  value,
  defaultValue = [],
  onChange,
  inputValue,
  defaultInputValue,
  onInputValueChange,
  placeholder = "Select options...",
  tagOptions = [],
  autoComplete = true,
  onlyTagOptions = false,
  allowDuplicates = false,
  clearButtonEnabled = true,
  maxTags = Number.MAX_SAFE_INTEGER,
  className,
  classList,
}: TagInputProps) => {
  const [selectedTags = [], setSelectedTags] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onChange,
  });
  const [term, setTerm] = useControllableState({
    prop: inputValue,
    defaultProp: defaultInputValue,
    onChange: onInputValueChange,
  });
  const [focused, setFocused] = useState<Tag>();
  const ref = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = ref.current;

      if (input) {
        if (event.key === "Delete" || event.key === "Backspace") {
          if (!input.value) {
            setSelectedTags((previousSelectedValues) => {
              const newSelected = [...(previousSelectedValues ?? [])];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // this is not a default behavior of the <input /> field
        if (event.key === "Escape") input.blur();

        const isDuplicate = !!selectedTags.find(
          (selected) => selected.value === term,
        );

        //todo: simplify if condition and make them more readable

        if (
          event.key === "Enter" &&
          !onlyTagOptions &&
          !!term &&
          (!isDuplicate || allowDuplicates) &&
          selectedTags.length < maxTags
        ) {
          setSelectedTags((previousSelectedValues) => [
            ...(previousSelectedValues ?? []),
            { value: term, label: term },
          ]);
          setTerm("");
        }

        // if (event.key === "Tab" && options) {
        // }
      }
    },
    [
      setSelectedTags,
      selectedTags,
      allowDuplicates,
      term,
      setTerm,
      onlyTagOptions,
      maxTags,
    ],
  );

  const handleUnselect = (selectedTag: Tag) => {
    setSelectedTags((previousSelectedValues) =>
      previousSelectedValues?.filter(
        (previousSelected) => previousSelected.value !== selectedTag.value,
      ),
    );
  };

  const availableTagOptions = tagOptions?.filter(
    (tagOption) =>
      !selectedTags.find(
        (selectedTag) => selectedTag.value === tagOption.value,
      ),
  );

  return (
    <Command
      // defaultValue={"-"}
      className={cn(
        "overflow-visible border border-border bg-transparent shadow-none backdrop-blur-none",
        className,
        classList?.root,
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="group !border-t-0 size-ful rounded px-2 py-1.5 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="!border-t-0 flex flex-wrap items-center gap-1">
          {selectedTags.map((selectedTag) => {
            return (
              <Badge
                key={selectedTag.value}
                variant={"soft"}
                className={cn("my-auto", classList?.selectedTag)}
              >
                {selectedTag.label}
                <button
                  type={"button"}
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleUnselect(selectedTag);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={() => handleUnselect(selectedTag)}
                >
                  <XIcon className="size-3 text-foreground-dimmed hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <div className="relative flex flex-1">
            {autoComplete ? (
              <CommandPrimitive.CommandInput
                ref={ref}
                value={term}
                onValueChange={setTerm}
                onBlur={() => setIsOpen(false)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className={cn(
                  "ml-1 h-6 flex-1 border-0 bg-transparent outline-none backdrop-blur-none placeholder:text-foreground-dimmed",
                  clearButtonEnabled && "pr-8",
                )}
              />
            ) : (
              <Input
                ref={ref}
                value={term}
                onTextChange={setTerm}
                placeholder={placeholder}
                className={cn(
                  "!bg-unset ml-1 h-6 flex-1 border-0 outline-none placeholder:text-foreground-dimmed",
                  clearButtonEnabled && "pr-8",
                )}
              />
            )}
            {clearButtonEnabled && (
              <button
                type={"button"}
                className="-translate-y-1/2 absolute top-1/2 right-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setSelectedTags([]);
                }}
              >
                <XIcon className="size-3 text-background-dimmed hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
      {autoComplete && (
        <div className="!border-t-0 relative top-2 bg-transparent backdrop-blur-none">
          <CommandList className="bg-transparent backdrop-blur-none">
            {isOpen && availableTagOptions.length > 0 && (
              <div
                className={cn(
                  popoverContentVariants(),
                  "absolute top-0 z-10 w-full outline-none",
                )}
              >
                <CommandGroup className="h-full overflow-auto bg-transparent backdrop-blur-none">
                  {/*<CommandItem value="-" className="hidden" />*/}
                  {availableTagOptions.map((availableSuggestedTag) => {
                    return (
                      <CommandItem
                        key={availableSuggestedTag.value}
                        value={availableSuggestedTag.value}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onFocus={(event) => {
                          const isFocused = event.target.ariaSelected;
                          if (isFocused) setFocused(availableSuggestedTag);
                        }}
                        onSelect={() => {
                          setSelectedTags((previousSelectedValues) => [
                            ...(previousSelectedValues ?? []),
                            availableSuggestedTag,
                          ]);
                          setTerm("");
                        }}
                        className={cn(
                          "cursor-pointer aria-selected:bg-primary/30",
                          classList?.suggestedTag,
                        )}
                      >
                        {availableSuggestedTag.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      )}
    </Command>
  );
};
