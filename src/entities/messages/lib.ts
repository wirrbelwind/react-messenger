import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db, getUser } from "shared/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"

export async function fetchMessages(chatID: string, client: QueryClient): Promise<IMessage[]> {
	// const client = useQueryClient()
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)
	onSnapshot(msgQuery, snap => {
		// snap.docChanges().map(msg => client.setQueryData())
		console.log('появилось сообщение');
		snap.docChanges().map(msg => {
			client.setQueryData(tanstackKeys.MESSAGES.GET(chatID), (old: any) => [
				...old as IMessage[],
				msg.doc.data()
			])
		})

		// client.invalidateQueries({ queryKey: tanstackKeys.MESSAGES.GET(chatID) })
		// client.refetchQueries({queryKey: tanstackKeys.MESSAGES.GET(chatID)})

	})
	const msgSnapshot = await getDocs(msgQuery)

	return msgSnapshot.docs.map(msg => { return { ...msg.data(), id: msg.id } }) as IMessage[]
}