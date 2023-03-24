export function randArrElement<T>(arr: Array<T>): T {
	return arr[Math.floor(Math.random() * arr.length)]
}