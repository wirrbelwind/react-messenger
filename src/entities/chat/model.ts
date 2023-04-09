import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/firebase"
import { IChat } from "shared/libs/types"
import { fetchActualChat, fetchChatList } from "./lib"

export const useChatList = () => {
	const uid = getUser()?.uid

	return useQuery<IChat[]>({
		enabled: !!uid,
		queryFn: () => fetchChatList(uid!),
		queryKey: tanstackKeys.CHATLIST.GET_LIST
	})
}
export const useChat = (chatID: string | undefined) => {
	const uid = getUser()?.uid

	return useQuery({
		enabled: (!!chatID && !!uid),
		queryFn: () => fetchActualChat(chatID!, uid!),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID!),
	})
}