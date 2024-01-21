import { useMemo } from "react";

// T extends { label: string } ensures that T will at least have a 'label' property of type string
const useFilteredOptions = <T extends { label: string }>(
  options: T[],
  inputValue: string
) => {
  return useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);
};

export default useFilteredOptions;
