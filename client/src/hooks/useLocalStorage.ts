import { useState } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const updateValue: SetValue<T> = (newValue) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, updateValue];
};
