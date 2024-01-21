import React from "react";
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
import styles from "./Combobox.module.scss";

export interface Option {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface ComboboxProps<T extends Option> {
  selectedOption: T | null;
  onChange: (option: T) => void;
  options: T[];
  updateOptions: (options: T[]) => void;
  label?: string;
}
export function Combobox<T extends Option>({
  selectedOption,
  onChange,
  options,
  updateOptions,
  label = "Select option...",
}: ComboboxProps<T>): JSX.Element {
  const {
    filteredOptions,
    handleSelect,
    handleKeyPress,
    buttonWidth,
    setInputValue,
    open,
    setOpen,
    buttonRef,
  } = useCombobox<T>({
    onChange,
    options,
    updateOptions,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={styles.comboboxButton}
          ref={buttonRef}
        >
          {selectedOption?.label || label}
          <CaretSortIcon className={styles.icon} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        style={{ width: `${buttonWidth}px` }}
        className={styles.popoverContent}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search option..."
            className={styles.commandInput}
            onValueChange={setInputValue}
            onKeyDown={handleKeyPress}
          />
          {filteredOptions.length === 0 && (
            <CommandEmpty>No options found.</CommandEmpty>
          )}

          <CommandGroup className={styles.commandGroup}>
            {filteredOptions.map((option) => {
              console.log(option); // just for demonstration and debugging
              return (
                <CommandItem
                  key={option.value}
                  value={`${option.value}`}
                  onSelect={() => handleSelect(option)}
                  className={styles.commandItem}
                >
                  <div>
                    {option.label}
                    {option.icon && (
                      <span dangerouslySetInnerHTML={{ __html: option.icon }} />
                    )}
                  </div>

                  {selectedOption?.value === option.value && (
                    <CheckIcon className={styles.icon} />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
