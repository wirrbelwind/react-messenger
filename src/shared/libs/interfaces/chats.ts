import { DocumentReference } from "firebase/firestore"

// export interface RawChat {
// 	id: string
// 	type: 'direct' | 'group'
// 	usersID: DocumentReference[]
// 	group?: GroupChatData
// 	companion?: ICompanion
// 	lastMessage?: IMessage
// }
// export interface IGroupChat extends GroupChatData, Omit<RawChat, 'companion' | 'group'> {
// 	type: 'group'
// }
// export interface IPrivateChat extends ICompanion, Omit<RawChat, 'companion' | 'group'> {
// 	type: 'direct'
// }
export interface IBaseChat {
	id: string
	type: 'direct' | 'group'
	usersID: DocumentReference[]
}
export interface IPrivateChat extends IBaseChat, ICompanion {}
export interface IGroupChat extends IBaseChat, IGroupChatData {}

export type IChat = IPrivateChat | IGroupChat

export interface ICompanion {
	companionID: string
	name: string
	photoURL?: string
}
export interface IGroupChatData {
	descr?: string
	name: string
	ownerID: DocumentReference
	photoURL: string
}
