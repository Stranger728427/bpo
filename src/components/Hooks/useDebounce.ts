import { useEffect, useState } from 'react';
import { DEBOUNCE_TIMEOUT } from '../constants/Constant';

/**
 * useDebounce
 * Delays updating the returned value until after delay ms
 * Useful for search inputs & API calls
 */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_TIMEOUT): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
