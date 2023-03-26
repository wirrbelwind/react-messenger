import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/firebase"
import { IChat } from "shared/libs/types"
import { fetchActualChat, fetchChatList } from "./lib"

export const useChatList = () => {

	return useQuery<IChat[]>({
		queryFn: () => fetchChatList(),
		queryKey: tanstackKeys.CHATLIST.GET_LIST
	})
}
export const useChat = (chatID: string) => {
	return useQuery({
		queryFn: () => fetchActualChat(chatID),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID)
	})
}