export interface ChatBriefing {
	id: string
	users: string[]
	type: 'direct' | 'group'
	group?: GroupInfo
	companion?: Companion
	lastMessage?: Message
}
interface GroupInfo {
	descr?: string
	ownerID: string
	name: string
	photoURL?: string
}
interface Companion {
	photoURL: string
	name: string
}
export interface Message {
	id: string
	text: string
	senderID: string
}
