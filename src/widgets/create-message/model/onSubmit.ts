import { Timestamp } from "firebase/firestore";
import firebase from "shared/api";
import { UseInputReturnType } from "shared/libs/hooks/useInput";
import { IBaseChat } from "shared/libs/interfaces/chats";
import { IPendingMessage } from "shared/libs/interfaces/messages";
import { IUser, Viewer } from "shared/libs/interfaces/users";

export function onSubmit(
	user: Viewer | null | undefined,
	input: UseInputReturnType<string>,
	sendMsg: (newMsg: IPendingMessage) => void,
	chatID: string
) {
	const uid = user?.uid
	if (!input.value || !uid) return;

	// sendMessage(chatID, input.value)
	const newMsg: IPendingMessage = {
		chat: firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID),
		sender: firebase.firestoreAPI.getDocRef<IUser>('users', uid),
		status: 'unread',
		text: input.value,
		timestamp: Timestamp.now()
	}

	sendMsg(newMsg)

	input.setValue('')
}