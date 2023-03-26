import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/firebase"
import { IMessage } from "shared/libs/types"
import { fetchMessages, sendMessage } from "./lib"

export const useMessages = (chatID: string): UseQueryResult<IMessage[]> => {

	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}


export function useCreateMessage() {

	return (chatID: string, text: string) => {
		const timestamp = new Date()

		return useMutation<
			IMessage | undefined, //returns
			unknown, // error
			{ chatID: string, text: string } // mutate vars
		>({
			mutationFn: ({ chatID, text }) => sendMessage(chatID, text),
			mutationKey: tanstackKeys.MESSAGES.SEND(chatID)
		})
	}
}