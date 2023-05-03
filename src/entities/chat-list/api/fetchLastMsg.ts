import { orderBy, where} from "firebase/firestore"
import { FirestoreApi } from "shared/api/firestore-api"
import { IBaseChat } from "shared/libs/interfaces/chats"
import { IMessage } from "shared/libs/interfaces/messages"

export async function fetchLastMsg(api: FirestoreApi, chatID: string): Promise<IMessage> {
	const chatRef = api.collection<IBaseChat>('chat_base')

	const lastMsg = await api.readOneByQuery<IMessage>(
		'messages',
		where("chatID", "==", chatRef), orderBy("timestamp", "desc")
	)

	return lastMsg
}
