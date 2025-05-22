import { useRef } from "react";

export default (callback: (...args: any[]) => void, delay: number = 0) => { // eslint-disable-line no-unused-vars
  const timeoutId = useRef<number | null>(null);
  
  return function(...args: any[]) {
    if (timeoutId.current) { // This check is not strictly necessary
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => callback(...args), delay);
  };
};