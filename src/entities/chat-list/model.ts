import { useQuery } from "@tanstack/react-query"
import { fetchChats } from "./api/fetchChats"
import { fetchLastMsg } from "./api/fetchLastMsg"
import tanstackConfig from "shared/configs/tanstack.config"
import { IChat } from "shared/libs/interfaces/chats"
import { FirestoreApi } from "shared/api/firestore-api"
import firebase from 'shared/api/index'

export const useChatList = (userID: string | null) => {

	const hook = useQuery<IChat[]>({
		enabled: !!userID,
		queryFn: () => queryChatList(firebase.firestoreAPI, userID!),
		queryKey: tanstackConfig.CHATLIST.GET_LIST
	})

	return hook
}

async function queryChatList(api: FirestoreApi, uid: string) {
	const chats = await fetchChats(api, uid)

	chats.forEach(async (chat, index, arr) => {
		arr[index].lastMsg = await fetchLastMsg(api, chat.id)
	})
	
	return chats
}
