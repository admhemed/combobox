import { useState, useEffect, useRef, KeyboardEvent } from "react";
import useFilteredOptions from "./filterHook";
import { ComboboxProps, Option } from "./Combobox";

interface UseComboboxProps<T extends { value: string; label: string }>
  extends Omit<ComboboxProps<T>, "value" | "label"> {
  initialValue?: string;
}
interface UseComboboxReturn<T extends Option> {
  selectedValue: string;
  filteredOptions: T[];
  handleSelect: (value: string) => void;
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  buttonWidth: number;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

function useCombobox<T extends Option>({
  onChange,
  options,
  initialValue = "",
  updateOptions,
}: UseComboboxProps<T>): UseComboboxReturn<T> {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const filteredOptions = useFilteredOptions(options, inputValue);

  const handleSelect = (value: string): void => {
    onChange(value === selectedValue ? "" : value);
    setSelectedValue(value === selectedValue ? "" : value);
    setOpen(false);
    setInputValue("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
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

  return {
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
  };
}

export default useCombobox;
