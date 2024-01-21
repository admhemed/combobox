"use client";
import * as React from "react";
import { useRef, useState, useEffect, KeyboardEvent } from "react";
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

interface ComboboxProps<T extends { value: string; label: string }> {
  value: string;
  onChange: (value: string) => void;
  options: T[];
  updateOptions: (options: T[]) => void;
  label?: string;
}

export function Combobox<T extends { value: string; label: string }>({
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
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && inputValue) {
      const newOption: T = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      } as T;
      if (!options.some((option) => option.value === newOption.value)) {
        updateOptions([...options, newOption]);
      }
      handleSelect(newOption.value);
      setInputValue("");
    }
  };

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
        <Command onKeyDown={handleKeyPress}>
          <CommandInput
            placeholder="Search option..."
            className="h-9"
            value={inputValue}
            onValueChange={setInputValue}
          />
          {options.length === 0 && (
            <CommandEmpty>No options found.</CommandEmpty>
          )}

          <CommandGroup>
            {options.map((option) => (
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
