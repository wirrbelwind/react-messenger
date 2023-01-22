import { action, computed, makeObservable, observable } from "mobx";
import { IDMChat, IGroupChat } from "../Models/IChat";
import { IUser } from "../Models/IUser";

export class SearchStore {
	constructor() { makeObservable(this) }

	// Loading state
	
	@observable private items = [] as Array<(IUser | IDMChat | IGroupChat)>
	

	@computed get getItems() {
		return this.items
	}
	@action setItems(items: []) {
		this.items = items
	}
}