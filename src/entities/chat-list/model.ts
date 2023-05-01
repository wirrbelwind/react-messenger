import { useQuery } from "@tanstack/react-query"
import { fetchChats } from "./lib/fetchChats"
import { fetchLastMsg } from "./lib/fetchLastMsg"
import tanstackConfig from "shared/configs/tanstack.config"
import { IChat } from "shared/libs/interfaces/chats"

export const useChatList = (userID: string | undefined) => {
	const hook = useQuery<IChat[]>({
		enabled: !!userID,
		queryFn: () => queryChatList(userID!),
		queryKey: tanstackConfig.CHATLIST.GET_LIST
	})
	return hook
}

async function queryChatList(uid: string) {
	const chats = await fetchChats(uid)

	chats.forEach(async (chat, index, arr) => {
		arr[index].lastMessage = await fetchLastMsg(chat.id)
	})
	return chats
}
