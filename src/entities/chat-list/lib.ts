import { collection, doc, DocumentReference, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { authModule, db, getUser } from "shared/firebase"
import { GroupChatData, IChat, IGroupChat, IMessage, IPrivateChat, PrivateChatData, RawChat } from "shared/types"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUser } from "shared/libs/hooks/useUser"
import { formatRawChat } from "shared/libs/objects/formatRawChat"

async function getChats(uid: string): Promise<IChat[]> {
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
			const companionID = chatData.usersID.find(chat => chat.id !== uid)

			if (!companionID) throw new Error('companion not found')

			const companionRef = doc(db, 'users', companionID.id)

			const companionSnap = await getDoc(companionRef)

			const companion: PrivateChatData = {
				...companionSnap.data() as PrivateChatData,
				companionID: companionSnap.id
			}

			chatData.companion = companion
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
async function attachLastMsgToChats(chats: IChat[]): Promise<IChat[]> {
	const msgCollRef = collection(db, 'messages')

	const updatedChats: IChat[] = await Promise.all(chats.map(async (chat) => {
		const chatRef = doc(db, 'chats', chat.id)

		//find messages
		const messagesQuery = query(
			msgCollRef,
			where("chatID", "==", chatRef), orderBy("timestamp", "desc"), limit(1)
		)
		const messagesSnapshot = await getDocs(messagesQuery)
		const lastMessage = messagesSnapshot.docs[0]?.data() as IMessage // get last message, if any
		return { ...chat, lastMessage } // return updated chat object
	}))

	return updatedChats
}

export async function fetchChatList(uid: string | undefined) {
	if (!uid) throw Error('uid is null')

	let chats = await getChats(uid)
	chats = await attachLastMsgToChats(chats)

	return chats
}

export function isGroupChat(chat: IChat): chat is IGroupChat {
	return chat.type === 'group'
}
export function isPrivateChat(chat: IChat): chat is IPrivateChat {
	return chat.type === 'direct'
}