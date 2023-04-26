import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/api/firebase"
import { IChat } from "shared/libs/types"
import { fetchChats } from "./lib/fetchChats"
import { fetchLastMsg } from "./lib/fetchLastMsg"

export const useChatList = (userID: string | undefined) => {
	const uid = getUser()?.uid

	return useQuery<IChat[]>({
		enabled: !!userID,
		queryFn: () => queryChatList(userID!),
		queryKey: tanstackKeys.CHATLIST.GET_LIST
	})
}

async function queryChatList(uid: string) {

	const chats = await fetchChats(uid)

	chats.forEach(async (chat, index, arr) => {
		arr[index].lastMessage = await fetchLastMsg(chat.id)
	})
	return chats
}
