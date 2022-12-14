import { action, computed, makeObservable, observable } from "mobx";
import { IUpdateUser, IUser } from "../Interfaces/IUser";

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
	@action updateUser(data: IUpdateUser) {
		Object.assign(this.user, data)
	}
}