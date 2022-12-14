import { action, computed, makeObservable, observable } from "mobx";
import { IDMChat, IGroupChat } from "../Interfaces/IChat";
import { IMessage } from "../Interfaces/IMessage";
import { IUpdateUser, IUser } from "../Interfaces/IUser";

export class ChatStore {
	constructor() { makeObservable(this) }

	// CHAT
	@observable private chat: IGroupChat | IDMChat = {} as IDMChat

	@computed get getChat() {
		return this.chat
	}
	@action removeChat() {
		this.chat = {} as IDMChat
	}
	@action setChat(newChat: IDMChat | IGroupChat) {
		this.chat = newChat
	}
	@action updateChat(data: IDMChat | IGroupChat) {
		Object.assign(this.chat, data)
	}
	// Methods check wether chat is DM or Group
	isGroup(chat = this.chat): chat is IGroupChat {
		return chat?.type === 'group'
	}
	isDM(chat = this.chat): chat is IDMChat {
		return chat?.type === 'dm'
	}

	// Participants
	@observable private party: IUser[] = [] as IUser[]

	@computed get getParty() {
		return this.party
	}
	@action setParty(newParty: IUser[]) {
		this.party = newParty
	}
	@action updateParty(newParty: IUpdateUser[]) {
		newParty.forEach(item => {
			for (let j = 0; j < this.party.length; j++)
				if (item.id === this.party[j].id) {
					Object.assign(this.party[j], item);
					continue;
				}
		})
	}
	@action removeParty() {
		this.party = [] as IUser[]
	}
	@action addParticipant(user: IUser) {
		this.party.push(user)
	}
	@action removeUserFromParty(userID: number) {
		for (let i = 0; i < this.party.length; i++) {
			if (this.party[i].id === userID) {
				delete this.party[i];
				break;
			}
		}
	}

	// Messages
	@observable private messages: IMessage[] = [] as IMessage[]

	@computed get getMessages() {
		return this.messages
	}
	@action setMessages(messages: IMessage[]) {
		this.messages = messages
	}
	@action removeMessages() {
		this.messages = [] as IMessage[]
	}

	@action editTheMessage(messageID: number, textContent: string) {
		for (let i = 0; i < this.messages.length; i++)
			if (this.messages[i].id === messageID) {
				this.messages[i].text_content = textContent
				break;
			}
	}
	@action deleteMessage(messageID: number) {
		this.messages = this.messages.filter(msg => msg.id !== messageID)
	}
	@action addMessage(message: IMessage) {
		this.messages.push(message)
	}
}