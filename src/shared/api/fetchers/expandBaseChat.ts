import { IBaseChat, IChat, IGroupChat, IPrivateChat } from "shared/libs/interfaces/chats";
import { fetchCompanion } from "./fetchCompanion";
import { fetchGroup } from "./fetchGroup";
import { FirestoreApi } from "../firestore-api";

export async function expandBaseChat(api: FirestoreApi, chat: IBaseChat): Promise<IChat> {
	if (chat.type === 'direct') {
		const privateChat: IPrivateChat = await fetchCompanion(api, chat)
		return privateChat
	}
	else if (chat.type === 'group') {
		const groupData: IGroupChat = await fetchGroup(api, chat)
		return groupData
	}

	throw new Error('Type of chat is not defined.')
}