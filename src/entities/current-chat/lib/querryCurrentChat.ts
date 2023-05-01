import { doc, getDoc } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { fetchCompanion } from "shared/libs/fetchers/fetchCompanion"
import { formatRawChat } from "shared/libs/formatRawChat"
import { IChat, RawChat } from "shared/libs/interfaces"

export async function queryCurrentChat(chatID: string, uid: string): Promise<Omit<IChat, 'lastMessage'>> {
	const chatRef = await getDoc(doc(db, 'chats', chatID))

	const chat = chatRef.data() as RawChat

	if (chat.type === 'direct') {
		chat.companion = await fetchCompanion(chat, uid)
	}
	return formatRawChat(chat)
}