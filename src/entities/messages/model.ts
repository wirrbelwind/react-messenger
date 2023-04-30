import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { IMessage } from "shared/libs/types"
import { fetchMessages } from "./lib"
import { Unsubscribe } from "firebase/firestore"

export const useMessages = (chatID: string): UseQueryResult<{
	messages: IMessage[],
	subscription: () => Unsubscribe
}> => {
	const client = useQueryClient()
	return useQuery({
		queryFn: () => fetchMessages(chatID, client),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}
