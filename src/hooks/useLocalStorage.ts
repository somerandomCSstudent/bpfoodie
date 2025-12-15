import { useState } from 'react';

/**
 * @function useLocalStorage
 * A custom hook to use localStorage as a state management solution.
 * * @param {string} key The key under which the value is stored in localStorage.
 * @param {T} initialValue The initial value to use if nothing is in localStorage.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use a let variable to hold the initial value from localStorage
  let storedValue: T;

  try {
    const item = window.localStorage.getItem(key);
    storedValue = item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If an error occurs (e.g., localStorage is unavailable), use the initial value
    console.error(`Error reading localStorage key “${key}”:`, error);
    storedValue = initialValue;
  }

  // State to store our value
  const [value, setValue] = useState<T>(storedValue);

  // Return a wrapped version of useState's setter function
  const setLocalValue = (newValue: T | ((val: T) => T)) => {
    try {
      // Allow the value to be a function, similar to useState
      let valueToStore: T;
      if (newValue instanceof Function) {
        // Use a let variable for the function's argument
        let current: T = value;
        valueToStore = newValue(current);
      } else {
        valueToStore = newValue;
      }
      
      // Update React state
      setValue(valueToStore);
      
      // Update local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [value, setLocalValue] as const;
}