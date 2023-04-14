import { User } from "firebase/auth"
import { DocumentReference, Timestamp } from "firebase/firestore"
export interface IMessage {
	id: string
	text: string
	senderID: DocumentReference
	chatID: DocumentReference
	status: 'read' | 'unread'
	timestamp: Timestamp
}
export interface RawChat {
	id: string
	type: 'direct' | 'group'
	usersID: DocumentReference[]
	group?: GroupChatData
	companion?: ICompanion
	lastMessage?: IMessage
}
export interface IGroupChat extends GroupChatData, Omit<RawChat, 'companion' | 'group'> {
	type: 'group'
}
export interface IPrivateChat extends ICompanion, Omit<RawChat, 'companion' | 'group'> {
	type: 'direct'
}
export interface ICompanion {
	companionID: string
	name: string
	photoURL?: string
}
export interface GroupChatData {
	descr?: string
	name: string
	ownerID: DocumentReference
	photoURL: string
}
export type IChat = IPrivateChat | IGroupChat

export function isGroupChat(chat: IChat | RawChat): chat is IGroupChat {
	return chat.type === 'group'
}
export function isPrivateChat(chat: IChat | RawChat): chat is IPrivateChat {
	return chat.type === 'direct'
}

export type IPendingMessage = Omit<IMessage, 'id'>

