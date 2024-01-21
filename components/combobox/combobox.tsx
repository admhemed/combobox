"use client";
import * as React from "react";
import { useRef, useState, useEffect, KeyboardEvent, useMemo } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useFilteredOptions from "./filterHook";
interface Option {
  value: string;
  label: string;
}
interface ComboboxProps<T extends Option> {
  value: string;
  onChange: (value: string) => void;
  options: T[];
  updateOptions: (options: T[]) => void;
  label?: string;
}

export function Combobox<T extends Option>({
  value,
  onChange,
  options,
  updateOptions,
  label = "Select option...",
}: ComboboxProps<T>): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const handleSelect = (currentValue: string): void => {
    onChange(currentValue === value ? "" : currentValue);
    setOpen(false);
    setInputValue("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    // console.log("key pressed", event, event.key, inputValue);
    if (event.key === "Enter" && inputValue) {
      setOpen(false);
      const newOption: T = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      } as T;
      if (!options.some((option) => option.value === newOption.value)) {
        updateOptions([...options, newOption]);
      }

      handleSelect(newOption.value);
    }
  };
  const filteredOptions = useFilteredOptions(options, inputValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
          ref={buttonRef}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent style={{ width: `${buttonWidth}px` }} className="p-0">
        <Command

        // onValueChange={setInputValue}
        >
          <CommandInput
            placeholder="Search option..."
            className="h-9"
            onKeyDown={handleKeyPress}
            onValueChange={(v) => {
              console.log("value changed", v);
              setInputValue(v);
            }}
          />
          {options.length === 0 && (
            <CommandEmpty>No options found.</CommandEmpty>
          )}

          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
