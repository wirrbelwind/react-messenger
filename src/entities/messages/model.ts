import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { IMessage } from "shared/libs/interfaces"
import { fetchMessages } from "./lib"
import { collection, doc, orderBy, query, Unsubscribe, where } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

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
