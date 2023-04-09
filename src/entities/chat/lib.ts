import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "shared/firebase"
import { IChat, IMessage, PrivateChatData, RawChat } from "shared/libs/types"
import { formatRawChat } from "shared/libs/formatRawChat"

export async function fetchChatList(uid: string) {
	let chats = await fetchChats(uid)
	chats = await Promise.all(chats.map(ch => attachLastMsgToChat(ch)))

	return chats
}
export async function fetchActualChat(chatID: string, uid: string): Promise<Omit<IChat, 'lastMessage'>> {
	const chatSnapshot = await getDoc(doc(db, 'chats', chatID))

	const chatData = chatSnapshot.data() as RawChat

	if (chatData.type === 'direct') {
		const companionRef = chatData.usersID.find(chat => chat.id !== uid)

		if (!companionRef) throw new Error('companion not found')
		const companionSnap = await getDoc(companionRef)

		const companion: PrivateChatData = {
			...companionSnap.data() as PrivateChatData,
			companionID: companionSnap.id
		}
		chatData.companion = companion
	}

	return formatRawChat(chatData)
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
async function fetchCompanion(chat: RawChat, viewerUID: string): Promise<PrivateChatData> {
	const companionRef = chat.usersID.find(c => c.id !== viewerUID)

	if (!companionRef) throw new Error('companion not found')

	const companionSnap = await getDoc(companionRef)

	const companion: PrivateChatData = {
		...companionSnap.data() as PrivateChatData,
		companionID: companionSnap.id
	}
	return companion
}
async function attachLastMsgToChat(chat: IChat): Promise<IChat> {
	const msgCollRef = collection(db, 'messages')

	const chatRef = doc(db, 'chats', chat.id)

	//find messages
	const messagesQuery = query(
		msgCollRef,
		where("chatID", "==", chatRef), orderBy("timestamp", "desc"), limit(1)
	)
	const messagesSnapshot = await getDocs(messagesQuery)
	const lastMessage = messagesSnapshot.docs[0]?.data() as IMessage // get last message, if any

	return { ...chat, lastMessage } // return updated chat object
}