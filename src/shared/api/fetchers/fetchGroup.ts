import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat, IGroupChat, IGroupChatData } from "shared/libs/interfaces/chats"

export async function fetchGroup(api: FirestoreApi, baseChat: IBaseChat) {
	const groupData = await api.readOneByID<IGroupChatData>('chat_group', baseChat.id)

	if (!groupData) throw new Error('Group chat info not found.')

	const groupChat: IGroupChat = {
		...baseChat,
		type: 'group',

		name: groupData.name,
		owner: groupData.owner,
		descr: groupData.descr,
		photoURL: groupData.photoURL,
	}

	return groupChat
}