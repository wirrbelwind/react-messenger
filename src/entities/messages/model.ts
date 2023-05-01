import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { fetchMessages } from "./lib"
import { collection, doc, orderBy, query, Unsubscribe, where } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import tanstackConfig from "shared/configs/tanstack.config"
import { IMessage } from "shared/libs/interfaces/messages"

export const useMessages = (chatID: string): UseQueryResult<{
	messages: IMessage[],
	subscription: () => Unsubscribe
}> => {
	const client = useQueryClient()
	return useQuery({
		queryFn: () => fetchMessages(chatID, client),
		queryKey: tanstackConfig.MESSAGES.GET(chatID),
	})
}

export function useMessages2(chatID: string) {
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)
	const hook = useCollectionData(msgQuery)
	return hook
}
