import { action, computed, makeObservable, observable } from "mobx";
import { IDMChat, IGroupChat } from "../Models/IChat";

export class ChatListStore {
	constructor() { makeObservable(this) }

	@observable private list = [] as Array<(IGroupChat | IDMChat)>
	@observable private query = ''

	//mobx methods for list[]
	@computed get getList() {
		return this.list
	}

	@action setList(newList: Array<(IGroupChat | IDMChat)>) {
		this.list = newList
	}
	@action addToList(chat: IGroupChat | IDMChat) {
		this.list.push(chat)
	}
	@action clearList() {
		this.list = [] as Array<(IGroupChat | IDMChat)>
	}
	@action deleteChatFromList(chatID: number) {
		this.list = this.list.filter(chat => chat.id !== chatID)
	}
	@action updateChat(newData: IGroupChat | IDMChat) {
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].id === newData.id) {
				Object.assign(this.list[i], newData)
				break;
			}
		}
	}
	//mobx methods for query
	@computed get getQuery() {
		return this.query
	}
	@action setQuery(value: string) {
		this.query = value
	}
}