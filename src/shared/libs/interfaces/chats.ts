import { DocumentReference } from "firebase/firestore"
import { IUser } from "./users"
import { IMessage } from "./messages"
export interface IBaseChat {
	id: string
	type: 'direct' | 'group'
	usersID: DocumentReference<IUser>[]
	lastMsg?: IMessage
}

export interface IPrivateChat extends IBaseChat {
	companion: IUser
 }
export interface IGroupChat extends IBaseChat { 
	group: IGroupChat
 }

export type IChat = IPrivateChat | IGroupChat


export interface IGroupChatData {
	description?: string
	name: string
	ownerID: DocumentReference
	photoURL: string
}
