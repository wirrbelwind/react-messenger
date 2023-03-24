import { Message } from "entities/messages";
import { doc, DocumentReference, Timestamp } from "firebase/firestore";
import { db, getUser } from "shared/firebase";
import { IMessage } from "shared/types";
export function sendMessage(text: string, chatID: string, userID: string) {
	const now = new Date()

	const msg: Omit<IMessage, 'id'> = {
		text,
		status: 'unread',
		timestamp: new Timestamp(now.getSeconds(), now.getMilliseconds()),
		chatID: doc(db, `/chats/${chatID}`),
		senderID: doc(db, `/users/${userID}`)
	}
}