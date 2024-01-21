import { useMemo, useState, useEffect } from "react";
import { Option } from "./Combobox";

// Helper function to debounce another function
const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number
): ((...args: Parameters<F>) => void) & { cancel: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: Parameters<F>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };

  debouncedFunction.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedFunction;
};

const useFilteredOptions = <T extends Option>(
  options: T[],
  inputValue: string,
  debounceDelay: number = 50 // Default debounce delay in milliseconds
) => {
  // State to hold the debounced input value
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  // Effect to update the debounced input value whenever the inputValue changes
  useEffect(() => {
    const handler = debounce(
      () => setDebouncedInputValue(inputValue),
      inputValue === "" ? debounceDelay * 5 : debounceDelay // If the input value is empty, increase the debounce delay to avoid unnecessary filtering
    );
    handler();
    // Cleanup function to clear the debounce timeout when the component is unmounted or inputValue changes
    return () => {
      handler.cancel();
    };
  }, [inputValue, debounceDelay]);

  return useMemo(() => {
    if (!debouncedInputValue) return options;
    return options.filter((option) =>
      `${option.value} ${option.label} ${option.description || ""}`
        .toLowerCase()
        .includes(debouncedInputValue.toLowerCase())
    );
  }, [options, debouncedInputValue]);
};

export default useFilteredOptions;
