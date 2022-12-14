import { IMessage } from "./IMessage"

export interface IDMChat {
	id: number
	type: 'dm' | 'group'
	avatar?: string
	name: string
	lastMessage: IMessage & { senderName: string }
}

// если чат групповой,то 
export interface IGroupChat extends IDMChat {
	descr?: string;
	owner_id: string;
}
