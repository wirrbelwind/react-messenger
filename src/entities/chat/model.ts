import { useQuery } from "@tanstack/react-query"
import tanstackConfig from "shared/configs/tanstack.config"
import { IBaseChat, IChat, IGroupChat, IGroupChatData, IPrivateChat } from "shared/libs/interfaces/chats"
import { FirestoreApi } from "shared/api/firestore-api"
import firestore from 'shared/api/index'
import { expandBaseChat } from "shared/api/fetchers/expandBaseChat"
import { FirestoreError, doc, where } from "firebase/firestore"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { IUser } from "shared/libs/interfaces/users"
import { converter } from "shared/api/firebase-converter"
import firebase from "shared/api/index"

export const useChat2 = (chatID: string, viewerID: string | undefined) => {
	const baseDocRef = firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID)
	const [baseChat, bLoading, bError] = useDocumentData(doc(firebase.dbModule, 'chat_base', chatID))

	const groupRef = firebase.firestoreAPI.getDocRef<IGroupChatData>('chat_group', chatID)
	const [groupChat, groupLoading, groupError] = useDocumentData(doc(firebase.dbModule, 'chat_group', chatID))

	const companionRef = baseChat?.users.find(u => u.id !== viewerID)
	const [companion, cLoading, cError] = useDocumentData(companionRef)

	let chat: undefined | IPrivateChat | IGroupChat = undefined
	let loading: undefined | boolean = undefined
	let error: undefined | FirestoreError = undefined

	if (baseChat?.type === 'direct' && companionRef && companion) {
		const result: IPrivateChat = {
			...baseChat,
			photoURL: companion.photoURL,
			name: companion.name,
			companion: companionRef,
			id: baseChat.id,
			type: 'direct'
		}
		chat = result
		loading = bLoading || cLoading
		error = bError || cError
	}
	else if(baseChat?.type === 'group' && groupChat) {
		const result: IGroupChat = {
			...baseChat,
			...groupChat,
			type: 'group',
			id: baseChat.id,
		}
		chat = result
		loading = bLoading || groupLoading
		error = bError || groupError
	}

	const result = [chat, loading, error]
	return result
}


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

	const viewer = baseChat?.users.find(user => user.id === uid)
	if (!viewer) throw new Error('You are not a member of chat')

	const chat = await expandBaseChat(api, baseChat)
	if (!chat) throw new Error('Chat defining was wrong.')

	// call this function to subscribe
	// Task: define type of callback
	const subscription = (callback: (obj: any) => void) => {
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
