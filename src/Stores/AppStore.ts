import { action, computed, makeObservable, observable } from "mobx";

export type sidebarContentType = 'chats' | 'search' | 'settings'

export class AppStore {
	constructor() { makeObservable(this) }

	// Loading state
	@observable private isLoading = false

	@computed get getIsLoading() {
		return this.isLoading
	}
	@action setLoading(value: boolean) {
		this.isLoading = value
	}

	// Auth state
	@observable private isAuth = false;

	@computed get getIsAuth() {
		return this.isAuth
	}
	@action setAuth(value: boolean) {
		this.isAuth = value
	}

	// Server connection state
	@observable private connection = false

	@computed get isConnected() {
		return this.connection
	}
	@action setConnection(value: boolean) {
		this.connection = value
	}
	//sidebar content state
	@observable private sidebarContent: sidebarContentType = 'chats'

	@computed get getSidebarContent() {
		return this.sidebarContent
	}
	@action setSidebarContent(value: sidebarContentType) {
		this.sidebarContent = value
	}
}