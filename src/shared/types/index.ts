import { User } from "firebase/auth"
import { DocumentReference } from "firebase/firestore"
export interface IMessage {
	id: string
	text: string
	senderID: DocumentReference
	status: 'read' | 'unread'
	timestamp: { seconds: number }
}
export interface RawChat {
	id: string
	type: 'direct' | 'group'
	usersID: DocumentReference[]
	group?: GroupChatData
	companion?: PrivateChatData
	lastMessage?: IMessage
}
export interface IGroupChat extends GroupChatData, Omit<RawChat, 'companion' | 'group'> {
	type: 'group'
}
export interface IPrivateChat extends PrivateChatData, Omit<RawChat, 'companion' | 'group'> {
	type: 'direct'
}
export interface PrivateChatData {
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



