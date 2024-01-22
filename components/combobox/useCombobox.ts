import { useState, useEffect, useRef, KeyboardEvent } from "react";
import useFilteredOptions from "./filterHook";
import { ComboboxProps, Option } from "./Combobox";

interface UseComboboxReturn<T extends Option> {
  filteredOptions: T[];
  handleSelect: (option: T) => void;
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  buttonWidth: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

function useCombobox<T extends Option>({
  onChange,
  options,
  updateOptions,
}: Omit<ComboboxProps<T>, "selectedOption">): UseComboboxReturn<T> {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const filteredOptions = useFilteredOptions(options, inputValue) as T[];

  const handleSelect = (option: T): void => {
    setOpen(false);
    onChange(option);
    setInputValue("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && inputValue) {
      if (
        !options.some((option) => option.value === inputValue.toLowerCase())
      ) {
        const newOption: T = {
          value: inputValue.toLowerCase(),
          label: inputValue,
        } as T;

        updateOptions([newOption, ...options] as T[]);

        handleSelect(newOption);
      }
    }
  };

  return {
    filteredOptions,
    handleSelect,
    handleKeyPress,
    buttonWidth,
    setInputValue,
    open,
    setOpen,
    buttonRef,
  };
}

export default useCombobox;
