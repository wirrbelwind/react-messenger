import { useEffect, useState } from "react"
import { PREFIX } from "../Config/config"

export default function useLocalStorage(key: string, initialValue: Function | string | null = null) {
	const prefixedKey = PREFIX + key
	const [value, setValue] = useState(() => {
		const value = localStorage.getItem(prefixedKey)
		if (value != null) return value
		if (typeof initialValue === 'function') return initialValue()
		else return initialValue
	})
	useEffect ( () => {
		localStorage.setItem(prefixedKey , value)
	} , [prefixedKey , value] )

	return [value , setValue]
}