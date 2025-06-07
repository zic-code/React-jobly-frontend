
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("LocalStorage read error:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (err) {
      console.error("LocalStorage write error:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;