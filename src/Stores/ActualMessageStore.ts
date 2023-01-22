import { action, computed, makeObservable, observable } from "mobx";
import { IMessage } from "../Models/IMessage";

export class ActualMessageStore {
	constructor() { makeObservable(this) }

	// CHAT
	@observable private text = ''
	@observable private attachments = [] as string[] // аттачменты доделать

	@computed get getText() {
		return this.text
	}
	@computed get getAttachs() {
		return this.attachments
	}

	@action setText(value: string) {
		this.text = value
	}

}