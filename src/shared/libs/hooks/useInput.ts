import { useState, ChangeEvent } from 'react';

export type UseInputReturnType<T> = {
  value: T,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  setValue: React.Dispatch<React.SetStateAction<T>>
};

function useInput<T = string | number>(initialValue: T): UseInputReturnType<T> {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as unknown as T; // Cast to T to ensure type safety
    setValue(newValue);
  };

  return {value, onChange, setValue}
}

export default useInput;