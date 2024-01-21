import { useMemo } from "react";
import { Option } from "./Combobox";

// T extends { label: string } ensures that T will at least have a 'label' property of type string
const useFilteredOptions = <T extends Option>(
  options: T[],
  inputValue: string
) => {
  return useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      `${option.value} ${option.label} ${option.description}`
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);
};

export default useFilteredOptions;
