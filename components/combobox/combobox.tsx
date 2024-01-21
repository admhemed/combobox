import React, { useRef, useState, useEffect, KeyboardEvent } from "react";
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
import useCombobox from "./useCombobox";

export interface Option {
  value: string;
  label: string;
}

export interface ComboboxProps<T extends Option> {
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
  const {
    selectedValue,
    filteredOptions,
    handleSelect,
    handleKeyPress,
    buttonWidth,
    inputValue,
    setInputValue,
    open,
    setOpen,
    buttonRef,
  } = useCombobox<T>({ onChange, options, initialValue: value, updateOptions });

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
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent style={{ width: `${buttonWidth}px` }} className="p-0">
        <Command>
          <CommandInput
            placeholder="Search option..."
            className="h-9"
            onValueChange={setInputValue}
            onKeyDown={handleKeyPress}
          />
          {filteredOptions.length === 0 && (
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
                    selectedValue === option.value ? "opacity-100" : "opacity-0"
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
