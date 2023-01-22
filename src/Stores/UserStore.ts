import { action, computed, makeObservable, observable } from "mobx";
import { IUser } from "../Models/IUser";

export class UserStore {
	constructor() { makeObservable(this) }

	@observable private user = {} as IUser

	@computed get getUser() {
		return this.user
	}
	
	@action removeUser() {
		this.user = {} as IUser
	}
	@action  setUser(newUser: IUser) {
		this.user = newUser
	}
	@action updateUser(data: Partial<IUser>) {
		Object.assign(this.user, data)
	}
}