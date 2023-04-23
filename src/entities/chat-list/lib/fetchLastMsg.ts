import { collection, doc, query, orderBy, where, limit, getDocs, getDocs } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { IMessage } from "shared/libs/types"

export async function fetchLastMsg(chatID: string): Promise<IMessage> {
	const msgCollRef = collection(db, 'messages')

	const chatRef = doc(db, 'chats', chatID)

	//find messages
	const messagesQuery = query(
		msgCollRef,
		where("chatID", "==", chatRef), orderBy("timestamp", "desc"), limit(1)
	)
	const messagesSnapshot = await getDocs(messagesQuery)
	const lastMessage = messagesSnapshot.docs[0]?.data() as IMessage // get last message, if any

	return lastMessage  // return updated chat object
}
