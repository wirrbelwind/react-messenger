import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"
import { BehaviorSubject } from "rxjs"
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

export function useMsgSendingQueue(chatID: string) {
	const msgQueue = new BehaviorSubject<IPendingMessage[]>([]);
	const queueState = useState(msgQueue.getValue())

	const sendMessage = useCreateMessage(chatID);

	msgQueue.subscribe(async (queue) => {
		if (queue.length > 0) {
			const message = queue[0];
			// Send message to backend API
			await sendMessage.mutateAsync({ msg: message })
			// Remove the sent message from the queue
			msgQueue.next(queue.slice(1));
			queueState[1](prev => prev.slice(1))
		}
	})

	return {
		state: queueState[0],
		addMessage: (newMsg: IPendingMessage) => {
			msgQueue.next([...msgQueue.value, newMsg])
			queueState[1](prev => [...prev, newMsg])
		},
		undoMessage: () => { }
	}
}