import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "shared/firebase"
import { IMessage } from "shared/types"

export const fetchMessages = async (chatID: string): Promise<IMessage[]> => {
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "desc")
	)

	const msgSnapshot = await getDocs(msgQuery)

	return msgSnapshot.docs.map(msg => { return { ...msg.data(), id: msg.id } }) as IMessage[]
}