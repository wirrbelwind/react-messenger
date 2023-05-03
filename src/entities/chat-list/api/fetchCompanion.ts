import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat, IPrivateChat } from "shared/libs/interfaces/chats"

export async function fetchCompanion(api: FirestoreApi, baseChat: IBaseChat) {
	const companionDocRef = baseChat.usersID.find(user => user.id !== baseChat.id)
	if (!companionDocRef) throw new Error('Companion not found.')

	const companion = await api.findByDocRef(companionDocRef)
	if (!companion) throw new Error('Companion not found.')

	const privateChat: IPrivateChat = {
		...baseChat,
		companion
	}

	return privateChat
}