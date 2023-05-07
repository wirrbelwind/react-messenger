import { useQuery } from "@tanstack/react-query"
import { fetchChats } from "./api/fetchChats"
import { fetchLastMsg } from "./api/fetchLastMsg"
import tanstackConfig from "shared/configs/tanstack.config"
import { IBaseChat, IChat } from "shared/libs/interfaces/chats"
import { FirestoreApi } from "shared/api/firestore-api"
import firebase from 'shared/api/index'
import { FirestoreError, query, where } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { IUser } from "shared/libs/interfaces/users"

interface useChatIDsResult {
	loading: undefined | boolean
	error: undefined | string | FirestoreError
	data: undefined | string[]
} 

export const useIDs = (userID: string) => { 
	const result: useChatIDsResult = {
		data: undefined, 
		loading: undefined, 
		error:undefined
	}

	const userRef = firebase.firestoreAPI.getDocRef<IUser>('users',userID)
	const condition = where('users', 'array-contains', userRef)

	const colRef = firebase.firestoreAPI.collection<IBaseChat>('chat_base')
	const q = query(colRef,condition)
	const [baseChats, baseLodaing, baseError] = useCollection(q)
	
	result.data = baseChats?.docs.map(chat => chat.id)
	result.loading ||= baseLodaing
	result.error ||= baseError
	
	return result
}

// export const useChatList = (userID: string | undefined) => {
// 	const hook = useQuery<IChat[]>({
// 		enabled: !!userID,
// 		queryFn: () => queryChatList(firebase.firestoreAPI, userID!),
// 		queryKey: tanstackConfig.CHATLIST.GET_LIST
// 	})

// 	return hook
// }

// async function queryChatList(api: FirestoreApi, uid: string) {
// 	const chats = await fetchChats(api, uid)

// 	chats.forEach(async (chat, index, arr) => {
// 		arr[index].lastMsg = await fetchLastMsg(api, chat.id)
// 	})
	
// 	return chats
// }
