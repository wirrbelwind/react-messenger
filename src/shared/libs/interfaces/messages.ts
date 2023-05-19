import { DocumentReference, Timestamp } from "firebase/firestore"

export interface IMessage {
	id: string
	text: string
	sender: DocumentReference
	chat: DocumentReference
	status: 'read' | 'unread'
	timestamp: Timestamp
}
export type IPendingMessage = Omit<IMessage, 'id'>
