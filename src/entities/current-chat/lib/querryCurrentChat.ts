import { doc, getDoc } from "firebase/firestore"
import { fetchCompanion } from "shared/libs/fetchers/fetchCompanion"
import api from 'shared/api'
import { IBaseChat } from "shared/libs/interfaces/chats"
import { formatRawChat } from "shared/libs/utils/formatRawChat"

export async function queryCurrentChat(chatID: string, uid: string): Promise<Omit<IChat, 'lastMessage'>> {
	const chatRef = await getDoc(doc(api.db, 'chats', chatID))

	const chat = chatRef.data() as IBaseChat

	if (chat.type === 'direct') {
		chat.companion = await fetchCompanion(chat, uid)
	}
	return formatRawChat(chat)
}