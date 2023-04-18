import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db, getUser } from "shared/api/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"

export async function fetchMessages(chatID: string, client: QueryClient): Promise<IMessage[]> {
	// const client = useQueryClient()
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)

	//call to cancel subscription
	const unsubscribe = onSnapshot(msgQuery, snap => {
		const newMessages = snap.docChanges().map(msg => ({ ...msg.doc.data(), id: msg.doc.id } as IMessage))

		client.setQueryData(
			tanstackKeys.MESSAGES.GET(chatID),
			(messages: any) => [...messages, ...newMessages]
		)
	})

	const msgSnapshot = await getDocs(msgQuery)

	return msgSnapshot.docChanges().map(msg => { return { ...msg.doc.data(), id: msg.doc.id } }) as IMessage[]
}