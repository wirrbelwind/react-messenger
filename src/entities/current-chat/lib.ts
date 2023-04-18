import { doc, getDoc } from "firebase/firestore"
import { db } from "shared/api/firebase"
import { IChat, ICompanion, RawChat } from "shared/libs/types"
import { formatRawChat } from "shared/libs/formatRawChat"

export async function queryCurrentChat(chatID: string, uid: string): Promise<Omit<IChat, 'lastMessage'>> {
	const chatRef = await getDoc(doc(db, 'chats', chatID))

	const chat = chatRef.data() as RawChat

	if (chat.type === 'direct') {
		chat.companion = await fetchCompanion(chat, uid)
	}

	return formatRawChat(chat)
}

async function fetchCompanion(chat: RawChat, viewerID: string) {
	const companionRef = chat.usersID.find(chat => chat.id !== viewerID)

	if (!companionRef) throw new Error('companion not found')
	const companionSnap = await getDoc(companionRef)

	const companion: ICompanion = {
		...companionSnap.data() as ICompanion,
		companionID: companionSnap.id
	}
	return companion
}