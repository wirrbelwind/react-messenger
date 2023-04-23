export interface IBackendAPI {
	read<T extends any>(entity: string, options: ReadOptions): Promise<T>
	write(): any
	delete(): any
}
export interface ReadOptions {
	conditions: Condition[]
}
export interface Condition {
	field: string
	operator: unknown
	value: unknown
}
export type EntityName = /* 'user' |  */
	'chat' | 'message'
