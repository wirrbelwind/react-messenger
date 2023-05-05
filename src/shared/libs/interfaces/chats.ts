import { DocumentReference } from "firebase/firestore"
import { IUser } from "./users"
import { IMessage } from "./messages"

//general
export type ChatType = 'group' | 'direct'

export interface IBaseChat {
	id: string
	type: 'direct' | 'group'
	usersID: DocumentReference<IUser>[]
	lastMsg?: IMessage
}

export type IChat = IPrivateChat | IGroupChat
export type IChatWithoutLastMsg = Omit<IChat, 'lastMsg'>

// private chat
export interface IPrivateChat extends IBaseChat, IPrivateChatData {
	type: 'direct'
}
export interface IPrivateChatData {
	name: string
	photoURL?: string
	companion: DocumentReference
}

// group chat
export interface IGroupChat extends IGroupChatData, IBaseChat {
	type: 'group'
}
export interface IGroupChatData {
	name: string
	photoURL?: string
	descr?: string
	owner: DocumentReference
}
