import { where } from "firebase/firestore"
import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat, IChat, IGroupChat, IPrivateChat } from "shared/libs/interfaces/chats"
import { fetchCompanion } from "./fetchCompanion"
import { fetchGroup } from "./fetchGroup"

export async function fetchChats(api: FirestoreApi, uid: string): Promise<IChat[]> {
	const chatsCondition = where('usersID', 'array-contains', 'uid')

	const baseChats = await api.readMany<IBaseChat>('chat_base', chatsCondition)
	const chats: IChat[] = []

	await Promise.all(baseChats.map(async baseChat => {
		if (baseChat.type === 'direct') {
			const privateChat: IPrivateChat = await fetchCompanion(api, baseChat)
			chats.push(privateChat)
		}
		else if (baseChat.type === 'group') {
			const groupData: IGroupChat = await fetchGroup(api, baseChat)
			chats.push(groupData)
		}
	}))

	return chats
}
