import { IBaseChat, IGroupChat, IGroupChatData, IPrivateChat } from "shared/libs/interfaces/chats"
import { FirestoreError } from "firebase/firestore"
import { useDocumentData, useDocument } from "react-firebase-hooks/firestore"
import firebase from "shared/api/index"

export const useChat = (chatID: string, viewerID: string | undefined) => {
	// base chat
	const baseChatStale = firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID)
	const [baseChat, baseChatLoading, baseChatError] = useDocument(baseChatStale)
	const baseChatData = baseChat?.data()

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