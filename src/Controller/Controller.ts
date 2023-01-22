import { useNavigate } from "react-router";
import { PREFIX } from "../Config/config";
import getCurrentDate from "../Helpers/getCurrentDate";
import { IDMChat, IGroupChat } from "../Models/IChat";
import { IUser } from "../Models/IUser";
import { signupForm } from "../Models/SignupData";
import AuthService from "../Services/AuthService";
import ChatService from "../Services/ChatService";
import { ActualMessageStore } from "../Stores/ActualMessageStore";
import { AppStore } from "../Stores/AppStore";
import { ChatListStore } from "../Stores/ChatListStore";
import { ChatStore } from "../Stores/ChatStore";
import { SearchStore } from "../Stores/SearchStore";
import { UserStore } from "../Stores/UserStore";
import { IControllerResponse } from "./IControllerResponse";

export class Controller {
	constructor(
		readonly appStore = new AppStore(),
		readonly userStore = new UserStore(),
		readonly chatListStore = new ChatListStore(),
		readonly chatStore = new ChatStore(),
		readonly searchStore = new SearchStore(),
		readonly actualMessageStore = new ActualMessageStore(),
	) {
	}
	async checkAuth(): Promise<IControllerResponse> {
		this.appStore.setLoading(true)
		try {
			const response = await AuthService.refreshAccessToken()

			this.userStore.setUser(response.data);
			this.appStore.setAuth(true)
		}
		catch (e: any) {
			return { error: e.response?.data.message || 'Ошибка подключения к серверу' }
		}
		finally {
			console.log(this.userStore.getUser);
			console.log(this.appStore.getIsAuth);
			this.appStore.setLoading(false)

		}
		return { success: true }
	}
	async login(login: string, password: string): Promise<IControllerResponse> {
		try {
			const response = await AuthService.login(login, password)
			this.userStore.setUser(response.data)
			this.appStore.setAuth(true)
			console.log(response.data)

		} catch (e: any) {
			return { error: e.response.data.message }
		}
		return { success: true }
	}

	async signup(signupData: signupForm): Promise<IControllerResponse> {
		try {
			const response = await AuthService.registration(signupData)
			this.userStore.setUser(response.data)
			this.appStore.setAuth(true)

		} catch (e: any) {
			return { error: e.response.data.message }
		}
		return { success: true }
	}
	async logout() {
		try {
			console.log('logout starts')

			const response = await AuthService.logout()
			if (response.data.success) {
				console.log('success');

				this.userStore.removeUser()
				this.appStore.setAuth(false)
			}
		}
		catch (e) {
			console.log(e);
		}
		finally {
			console.log(this.appStore.getIsAuth);
			console.log(this.userStore.getUser);
			console.log('logout completed')
		}
	}


	// chat store
	async openChat(chat: IDMChat | IGroupChat) {
		//remove states of previous chat
		this.chatStore.removeChat()
		this.chatStore.removeMessages()
		this.chatStore.removeParty()

		//get messages 
		this.chatStore.setChat(chat)

		const messages = await ChatService.getMessagesFromChat(chat.id)
		this.chatStore.setMessages(messages.data)

		const party = await ChatService.getPartyFromChat(chat.id)
		this.chatStore.setParty(party.data)
	}
	// chatlist store
	async getChatList() {
		const chats = await ChatService.getChatListByUserID(this.userStore.getUser.id)
		this.chatListStore.setList(chats.data)
	}

	// actual message store
	async sendMessage() {
		const currentDate = getCurrentDate()
		const text = this.actualMessageStore.getText
		const attachs = this.actualMessageStore.getAttachs
		const chatID = this.chatStore.getChat.id
		const userID = this.userStore.getUser.id
		// ChatService.sendMessage
	}
}