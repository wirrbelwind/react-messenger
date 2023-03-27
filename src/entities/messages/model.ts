import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { fetchMessages, sendMessage } from "./lib"

export const useMessages = (chatID: string): UseQueryResult<IMessage[]> => {

	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}


export function useCreateMessage(chatID: string) {
	const queryClient = useQueryClient()
	return useMutation<
		IMessage | undefined, //returns
		unknown, // error
		{ msg: IPendingMessage } // mutate vars
	>({
		mutationFn: ({ msg }) => sendMessage(msg),
		mutationKey: tanstackKeys.MESSAGES.SEND(chatID),

		// effects
		onSuccess(data, variables, context) {
			 queryClient.invalidateQueries(tanstackKeys.MESSAGES.GET(chatID))
		},
	})
}