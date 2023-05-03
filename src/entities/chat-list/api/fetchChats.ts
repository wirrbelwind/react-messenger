import { where } from "firebase/firestore"
import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat, IChatWithoutLastMsg } from "shared/libs/interfaces/chats"
import { expandBaseChat } from "shared/api/fetchers/expandBaseChat"

export async function fetchChats(api: FirestoreApi, uid: string): Promise<IChatWithoutLastMsg[]> {
	const chatsCondition = where('usersID', 'array-contains', uid)

	const baseChats = await api.readMany<IBaseChat>('chat_base', chatsCondition)
	const chats: IChatWithoutLastMsg[] = []

	await Promise.all(baseChats.map(async baseChat => {
		const definedChat = await expandBaseChat(api, baseChat)
		if (definedChat) chats.push(definedChat)
	}))

	return chats
}
