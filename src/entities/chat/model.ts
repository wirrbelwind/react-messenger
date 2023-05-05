import { useQuery } from "@tanstack/react-query"
import tanstackConfig from "shared/configs/tanstack.config"
import { IBaseChat, IPrivateChat } from "shared/libs/interfaces/chats"
import { FirestoreApi } from "shared/api/firestore-api"
import firestore from 'shared/api/index'
import { expandBaseChat } from "shared/api/fetchers/expandBaseChat"
import { where } from "firebase/firestore"

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

async function queryChat(api: FirestoreApi, chatID: string, uid: string) {
	const baseChat = await api.readOneByID<IBaseChat>('chat_base', chatID)
	if (!baseChat) throw new Error('Chat not found.')

	const viewer = baseChat?.usersID.find(user => user.id === uid)
	if (!viewer) throw new Error('You are not a member of chat')

	const chat = await expandBaseChat(api, baseChat)
	if (!chat) throw new Error('Chat defining was wrong.')

	// call this function to subscribe
	// Task: define type of callback
	const subscription = (callback: any) => {
		const baseSubscription = api.subscribe<IBaseChat>('chat_base', callback, where('id', '==', chatID))
		const privateSubscription = api.subscribe<IPrivateChat>('chat_private', callback, where('id', '==', chatID))
		const groupSubscription = api.subscribe<IPrivateChat>('chat_group', callback, where('id', '==', chatID))

		return () => {
			baseSubscription()
			privateSubscription()
			groupSubscription()
		}
	}


	return {
		data: chat,
		subscription
	}
}
