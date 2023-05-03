import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { Unsubscribe, collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore"
import api from "shared/api"
import tanstackConfig from "shared/configs/tanstack.config"
import { IMessage } from "shared/libs/interfaces/messages"

export async function fetchMessages(chatID: string, client: QueryClient): Promise<{
	messages: IMessage[],
	subscription: () => Unsubscribe
}> {
	// const client = useQueryClient()
	const chatDocRef = doc(api.db, 'chats', chatID)

	const msgQuery = query(
		collection(api.db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)

	const msgSnapshot = await getDocs(msgQuery)
	const messages = msgSnapshot.docChanges().map(msg => { return { ...msg.doc.data(), id: msg.doc.id } }) as IMessage[]

	const subscription = () => onSnapshot(msgQuery, doc => {
		const messages = doc.docs.map(data => ({
			...data.data() as IMessage,
			id: data.id
		}))
		// client.setQueryData(
		// 	tanstackConfig.MESSAGES.GET(chatID),
		// 	() => [...messages]
		// )
		client.invalidateQueries(tanstackConfig.MESSAGES.GET(chatID))
	})

	return {
		messages,
		subscription
	}
}