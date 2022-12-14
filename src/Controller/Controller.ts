import { PREFIX } from "../Consts";
import { IDMChat, IGroupChat } from "../Interfaces/IChat";
import { IUser } from "../Interfaces/IUser";
import AuthService from "../Services/AuthService";
import ChatService from "../Services/ChatService";
import { ActualMessageStore } from "../Stores/ActualMessageStore";
import { AppStore } from "../Stores/AppStore";
import { ChatListStore } from "../Stores/ChatListStore";
import { ChatStore } from "../Stores/ChatStore";
import { SearchStore } from "../Stores/SearchStore";
import { UserStore } from "../Stores/UserStore";

export class Controller {
	constructor(
		readonly userStore: UserStore,
		readonly appStore: AppStore,
		readonly chatListStore: ChatListStore,
		readonly chatStore: ChatStore,
		readonly searchStore: SearchStore,
		readonly actualMessageStore: ActualMessageStore,
	) {
	}
	async checkAuth() {
		if (!localStorage.getItem(PREFIX + 'token')) return;

		this.appStore.setLoading(true)
		try {
			const response = await AuthService.toRefreshToken()

			localStorage.setItem(PREFIX + 'token', response.data.accessToken);

			this.userStore.setUser(response.data.user);
			this.appStore.setAuth(true)
		} catch (e: any) {
			console.log(e.response.data.message)
		} finally {
			this.appStore.setLoading(false)
		}
	}
	async login(login: string, password: string) {

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
		const now = new Date()
		const text = this.actualMessageStore.getText
		const attachs = this.actualMessageStore.getAttachs
		const chatID = this.chatStore.getChat.id
		const userID = this.userStore.getUser.id
		// ChatService.sendMessage
	}
}