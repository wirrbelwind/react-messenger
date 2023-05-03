import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat, IGroupChat } from "shared/libs/interfaces/chats"

export async function fetchGroup(api: FirestoreApi, baseChat: IBaseChat) {
	const groupData = await api.readOne<IGroupChat>('chat_group', baseChat.id)

	if (!groupData) throw new Error('Group chat info not found.')

	const groupChat: IGroupChat = {
		...baseChat,
		group: groupData
	}

	return groupChat
}