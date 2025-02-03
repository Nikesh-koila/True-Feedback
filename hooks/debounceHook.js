// hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * Custom debounce hook
 * @param {any} value - The value to debounce (e.g., userName)
 * @param {number} delay - The debounce delay in ms
 * @returns {any} - The debounced value
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up debounce effect
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
