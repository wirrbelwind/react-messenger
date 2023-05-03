import { useQuery } from "@tanstack/react-query"
import tanstackConfig from "shared/configs/tanstack.config"
import { doc, getDoc } from "firebase/firestore"
import api from 'shared/api'
import { IBaseChat, IChat, IChatWithoutLastMsg } from "shared/libs/interfaces/chats"
import { FirestoreApi } from "shared/api/firestore-api"
import firestore from 'shared/api/index'
import { expandBaseChat } from "shared/api/fetchers/expandBaseChat"

export const useChat = (
	chatID: string | null,
	userID: string | undefined
) => {

	return useQuery({
		enabled: (!!chatID && !!userID),
		queryFn: () => queryChat(firestore.firestoreAPI, chatID!, userID!),
		queryKey: tanstackConfig.ACTUAL_CHAT.GET(chatID!),
	})
}

async function queryChat(api: FirestoreApi, chatID: string, uid: string): Promise<IChatWithoutLastMsg> {
	const baseChat = await api.readOneByID<IBaseChat>('chat_base', chatID)
	if (!baseChat) throw new Error('Chat not found.')

	const viewer = baseChat?.usersID.find(user => user.id === uid)
	if (!viewer) throw new Error('You are not a member of chat')

	const chat = await expandBaseChat(api, baseChat)
	if (!chat) throw new Error('Chat defining was wrong.')

	return chat
}