import { useMutation } from "@tanstack/react-query"
import { addDoc, collection, getDoc } from "firebase/firestore"
import firebase from "shared/api"
import tanstackConfig from "shared/configs/tanstack.config"
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages"

async function sendMessage(msg: IPendingMessage, chatID: string | undefined) {
	if(!chatID) throw new Error('Chat doesn\'t exist.')

	const msgRef = firebase.firestoreAPI.collection<IMessage>('messages')
	await addDoc(msgRef, msg)
}

export function useCreateMessage(chatID: string | undefined) {
	return useMutation<
		void, //returns
		unknown, // error
		{ msg: IPendingMessage } // mutate vars
	>({
		mutationFn: ({ msg }) => sendMessage(msg, chatID),
		mutationKey: tanstackConfig.MESSAGES.SEND(chatID),
	})
}
