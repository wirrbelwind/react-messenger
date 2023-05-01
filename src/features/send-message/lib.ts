import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, getDoc } from "firebase/firestore"
import { db } from "shared/api/firebase"
import tanstackConfig from "shared/configs/tanstack.config"
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages"

async function sendMessage(msg: IPendingMessage) {

	const msgRef = await addDoc(collection(db, "messages"), msg)
	return (await getDoc(msgRef)).data() as IMessage
}

export function useCreateMessage(chatID: string) {
	return useMutation<
		IMessage | undefined, //returns
		unknown, // error
		{ msg: IPendingMessage } // mutate vars
	>({
		mutationFn: ({ msg }) => sendMessage(msg),
		mutationKey: tanstackConfig.MESSAGES.SEND(chatID),
	})
}
