import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore"
import { db, getUser } from "shared/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"

export async function fetchMessages(chatID: string): Promise<IMessage[]> {
	const chatDocRef = doc(db, 'chats', chatID)

	const msgQuery = query(
		collection(db, 'messages'),
		where('chatID', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)

	const msgSnapshot = await getDocs(msgQuery)

	return msgSnapshot.docs.map(msg => { return { ...msg.data(), id: msg.id } }) as IMessage[]
}
export async function sendMessage(msg: IPendingMessage) {
	const uid = getUser()?.uid
	if(!uid) throw new Error('uid is null')

	const msgRef = await addDoc(collection(db, "messages"), msg)
	return (await getDoc(msgRef)).data() as IMessage
}