export interface IAttachment {
	id: number
	type: string
	link: string
	messageID: number
}
export interface IPendingAttachment {
	type: string
	link: string
}