import React, { useState } from "react";
export interface IUseInput {
    value: string | number
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    setValue: React.Dispatch<React.SetStateAction<string | number>>
}
export default function useInput(initialValue: string | number) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return {
        value, onChange, setValue
    }
};