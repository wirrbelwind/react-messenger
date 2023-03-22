import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { IMessage } from "shared/types"
import { fetchMessages } from "./lib"

export const useMessages = (chatID: string) => {
	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID),
		queryKey: tanstackKeys.MESSAGES.GET(chatID)
	})
}