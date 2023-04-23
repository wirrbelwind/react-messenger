import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { IMessage } from "shared/libs/types"
import { fetchMessages } from "./lib"

export const useMessages = (chatID: string): UseQueryResult<IMessage[]> => {
	const client = useQueryClient()
	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID, client),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}
