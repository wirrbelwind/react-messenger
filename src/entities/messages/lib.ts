import { QueryClient } from "@tanstack/react-query"
import { Unsubscribe, collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db } from "shared/api/firebase"
import { IMessage } from "shared/libs/types"

export async function fetchMessages(chatID: string, client: QueryClient): Promise<{
	messages: IMessage[],
	subscription: () => Unsubscribe
}> {
	// const client = useQueryClient()
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
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
		client.setQueryData(
			tanstackKeys.MESSAGES.GET(chatID),
			() => [...messages]
		)
	})

	return {
		messages,
		subscription
	}
}