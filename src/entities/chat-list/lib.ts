import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { IChat, IMessage, ICompanion, RawChat } from "shared/libs/types"
import { formatRawChat } from "shared/libs/formatRawChat"

export async function queryChatList(uid: string) {
	const chats = await fetchChats(uid)
	// chats = await Promise.all(chats.map(ch => attachLastMsgToChat(ch)))
	chats.forEach(async (chat, index, arr) => {
		arr[index].lastMessage = await queryLastMsg(chat)
	})

	return chats
}

async function fetchChats(uid: string): Promise<IChat[]> {
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
async function queryLastMsg(chat: IChat): Promise<IMessage> {
	const msgCollRef = collection(db, 'messages')

	const chatRef = doc(db, 'chats', chat.id)

	//find messages
	const messagesQuery = query(
		msgCollRef,
		where("chatID", "==", chatRef), orderBy("timestamp", "desc"), limit(1)
	)
	const messagesSnapshot = await getDocs(messagesQuery)
	const lastMessage = messagesSnapshot.docs[0]?.data() as IMessage // get last message, if any

	return lastMessage  // return updated chat object
}
async function fetchCompanion(chat: RawChat, viewerUID: string): Promise<ICompanion> {
	const companionRef = chat.usersID.find(c => c.id !== viewerUID)

	if (!companionRef) throw new Error('companion not found')

	const companionSnap = await getDoc(companionRef)

	const companion: ICompanion = {
		...companionSnap.data() as ICompanion,
		companionID: companionSnap.id
	}
	return companion
}