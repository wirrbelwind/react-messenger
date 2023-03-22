import { doc, getDoc, getDocs } from "firebase/firestore"
import { db, getUser } from "shared/firebase"
import { IChat, ICompanion } from "shared/types"



export const fetchActualChatInfo = async (chatID: string): Promise<IChat> => {
	const uid = getUser()?.uid
	if (!uid) {
		throw new Error('uid is null')
	}
	const chatSnapshot = await getDoc(doc(db, 'chats', chatID))

	const chat: IChat = {
		...chatSnapshot.data() as IChat,
		id: chatSnapshot.id,
	}

	if (chat.type === 'direct') {

		const companionID = chat.usersID.find(c => c.id !== uid)

		if (!companionID) throw Error('companion not found')

		const companionRef = doc(db, 'users', companionID.id)

		const companionShap = await getDoc(companionRef)

		const companion = {
			...companionShap.data() as ICompanion,
			id: companionShap.id
		}

		chat.companion = companion
	}

	return chat
}