import { IBaseChat, IGroupChat, IGroupChatData, IPrivateChat } from "shared/libs/interfaces/chats"
import firestore from 'shared/api/index'
import { expandBaseChat } from "shared/api/fetchers/expandBaseChat"
import { FirestoreError, doc, where } from "firebase/firestore"
import { useDocumentData, useDocument } from "react-firebase-hooks/firestore"
import { IUser } from "shared/libs/interfaces/users"
import { converter } from "shared/api/firebase-converter"
import firebase from "shared/api/index"

export const useChat = (chatID: string, viewerID: string | undefined) => {
	// base chat
	const baseChatStale = firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID)
	const [baseChat, baseChatLoading, baseChatError] = useDocument(baseChatStale)
	const baseChatData = baseChat?.data()
	// console.log(baseChatStale,baseChatData)

	// group chat
	const groupChatStale = firebase.firestoreAPI.getDocRef<IGroupChatData>('chat_group', chatID)
	const [groupChat, groupChatLoading, groupChatError] = useDocument(groupChatStale)

	// direct chat
	const companionRef = baseChatData?.users.find(u => u.id !== viewerID)
	const [companionData, companionLoading, companionError] = useDocumentData(companionRef)

	// returning
	let chat: undefined | IPrivateChat | IGroupChat = undefined
	let loading: undefined | boolean = undefined
	let error: undefined | FirestoreError = undefined

	if (baseChatData?.type === 'direct' && baseChat && companionRef && companionData) {
		const result: IPrivateChat = {
			...baseChatData,
			photoURL: companionData.photoURL,
			name: companionData.name,
			companion: companionRef,
			id: baseChat?.id,
			type: 'direct'
		}
		chat = result
		loading = baseChatLoading || companionLoading
		error = baseChatError || companionError
	}
	else if (baseChat && baseChatData?.type === 'group' && groupChat?.exists()) {
		const result: IGroupChat = {
			...baseChatData,
			...groupChat.data(),
			type: 'group',
			id: baseChat.id,
		}
		chat = result
		loading = baseChatLoading || groupChatLoading
		error = baseChatError || groupChatError
	}

	const result = { chat, loading, error }
	return result
}


// export const useChat = (
// 	chatID: string | null,
// 	userID: string | undefined
// ) => {

// 	return useQuery({
// 		enabled: (!!chatID && !!userID),
// 		queryFn: () => queryChat(firestore.firestoreAPI, chatID!, userID!),
// 		queryKey: tanstackConfig.ACTUAL_CHAT.GET(chatID!),
// 	})
// }

// async function queryChat(api: FirestoreApi, chatID: string, uid: string) {
// 	const baseChat = await api.readOneByID<IBaseChat>('chat_base', chatID)
// 	if (!baseChat) throw new Error('Chat not found.')

// 	const viewer = baseChat?.users.find(user => user.id === uid)
// 	if (!viewer) throw new Error('You are not a member of chat')

// 	const chat = await expandBaseChat(api, baseChat)
// 	if (!chat) throw new Error('Chat defining was wrong.')

// 	// call this function to subscribe
// 	// Task: define type of callback
// 	const subscription = (callback: (obj: any) => void) => {
// 		const baseSubscription = api.subscribe<IBaseChat>('chat_base', callback, where('id', '==', chatID))
// 		const privateSubscription = api.subscribe<IPrivateChat>('chat_private', callback, where('id', '==', chatID))
// 		const groupSubscription = api.subscribe<IPrivateChat>('chat_group', callback, where('id', '==', chatID))

// 		return () => {
// 			baseSubscription()
// 			privateSubscription()
// 			groupSubscription()
// 		}
// 	}


// 	return {
// 		data: chat,
// 		subscription
// 	}
// }
