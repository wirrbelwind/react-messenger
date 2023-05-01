import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { IChat, RawChat } from "shared/libs/interfaces"
import { formatRawChat } from "shared/libs/formatRawChat"
import { fetchCompanion } from "shared/libs/fetchers/fetchCompanion"

export async function fetchChats(uid: string): Promise<IChat[]> {

	const currentUserDocRef = doc(db, 'users', uid)

	//make a query that requests all the chats where current user consists in
	const chatListQuery = query(
		collection(db, 'chats'),
		where("usersID", "array-contains", currentUserDocRef)
	)
	const chatlistSnapshot = await getDocs(chatListQuery)

	const rawChats = [] as RawChat[]

	//filling the array by found chats
	await Promise.all(chatlistSnapshot.docs.map(async chatShanphot => {
		const chatData = chatShanphot.data() as RawChat

		if (chatData.type === 'direct') {
			chatData.companion = await fetchCompanion(chatData, uid)
		}
		rawChats.push({
			...chatData,
			id: chatShanphot.id,
		})
	}))

	let chats = rawChats.map(ch => formatRawChat(ch))

	chats = chats.filter(ch => !!ch)

	return chats as IChat[]
}
